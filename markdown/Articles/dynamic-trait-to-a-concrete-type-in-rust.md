# Dynamic Trait to a Concrete Type in Rust

As rust does not support interface , sometimes it can be difficult to cast a dynamic typed variable to a concrete type. Lets take a look how we can achieve similar functionality.

Every value in Rust is of a certain *data type*. Even null and errors are handled differently. In fact rust doesn't have null. Null values are handled via the Option type and errors are handled via Result type. Every struct we define has specific values as well.

What happens we need something dynamic of different types?

## Context

I'm trying to build a storage library, that supports multiple drivers. Sort of like [laravel's storage](https://laravel.com/docs/9.x/filesystem) class. In my design, we'd have something like

```rust
Storage::put('file-01.txt', content);

Storage::disk('s3')->put('file-02.png', content);

Storage::download('file-03.docs');
```

As it'll have different types of disks, which will work as adapters to our storage.

## The problem

The problem I was facing was having different config files for each type of disks. Our LocalFileAdapter , S3BucketFileAdapater , FTPFileAdapter each will have different type of config files. Simply put, S3BucketFileAdapater will have public key ,secret key and bucket name. LocalFileAdapater will not need these.

### Sketching

Now, I want to have a method something similar to Storage::new(config) or something like this. The config should have which adapter/s to use, with their appropriate configuration (and unique) values.

### Two cfgs

For better understanding, I'm paining two config structs.

```rust
pub struct LocalFileSystemAdapterConfig {
  pub root_dir: String,
}

pub struct S3AdapterConfig {
  pub public_key: String,
  pub secret_key: String,
  pub bucket: String,
  pub use_path_style_endpoint: false,
}
```

And I need something like

```rust
trait StorageAdapter {
  // ... methods
}
struct Storage {
  disk: StorageAdapter,
  // other props
}

let storage = Storage::from(LocalFileSystemAdapterConfig | S3AdapterConfig);

// and based on the given config
storage.disk = LocalFileSystem | S3
```

Defining a function that takes a dynamic parameter and casts it down to a specific / concrete type. The initial thought was maybe we should have something like

```rust
struct LocalAdapterConfig {
  base_dir: String,
}

impl LocalAdapter {
  pub fn new<T : dyn StorageAdapterConfigTrait>(config: T) -> LocalAdapter {
    let local_config = config as LocalAdapterConfig;
    // THIS IS NOT ALLOWED
  }
}
```

The attempt resulted in a failure and gave me:

```rust
... an `as` expression can only be used to convert between primitive types
```

Rust is saying, you can use the as keyword to convert between primitive types. This was not working. But as we are using a dynamictrait (as an interface concept). We can cast that trait to a concrete type.

## Solution: Downcast

In this case, our config: T would be converted to LocalAdapterConfig. Though the method signature needs to change a bit.

We want to use the Any trait, it uses reflection to allow dynamic typing of any 'static type.
>  Downcasting is converting a trait into a concrete type.

Our initial code is as follows

```rust
use std::any::Any;

pub struct LocalFileSystemAdapterConfig {
    pub base_directory: String,
}

pub struct LocalFileSystemAdapter {
  pub base_dir: String, // just for demo purpose
}

// the trait config that every storage adapter's config will implement
pub trait StorageAdapterConfig {
    fn as_any(&self) -> &dyn Any;
}
```

We need the as_any method to be implemented for concrete struct/s where we want to allow *downcasting*. Therefore,

```rust
use std::any::Any;

impl StorageAdapterConfig for LocalFileSystemAdapterConfig {
    fn as_any(&self) -> &dyn Any {
        self
    }
}
```

We also need to change our method's signature from

```rust
pub fn new<T : dyn StorageAdapterConfigTrait>(config: T)
```

to

```rust
pub fn new(config: &dyn Any)

// make sure to import std::any::Any;
```

And finally, to downcast a variable of type dyn Any to our concrete LocalFileSystemAdapterConfig ,

```rust
let cfg : &LocalFileSystemAdapterConfig = config
            .downcast_ref::<LocalFileSystemAdapterConfig>()
            .expect("failed to downcast");

// the syntax is
// .downcast_ref::<$CONCRETE_TYPE>().expect("msg");
```

The full code,

```rust
impl LocalFileSystemAdapter {

    pub fn new(config: &dyn Any) -> LocalFileSystemAdapter {

        let cfg : &LocalFileSystemAdapterConfig = config
            .downcast_ref::<LocalFileSystemAdapterConfig>()
            .expect("failed to downcast");

        let base_dir = &cfg.base_directory;

        LocalFileSystemAdapter {
            base_dir: base_dir.to_string(),
        }
    }

  // ...
}
```

Our IDE picks up the change and returns proper intellisense.

![**Downcasting a dyn trait to a concrete type**](https://cdn-images-1.medium.com/max/3676/1*Wc_P7YRnKepKZIwN-e-zlA.png)

***Note **maybe there are better ways of achieving the same result, maybe the API Design could have been better to avoid it in the first place. Well, I'm still learning rust.*

Found a mistake? Feel free to point it out.
