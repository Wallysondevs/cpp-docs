# Header da biblioteca padrão &lt;memory_resource&gt; (C++17)

### Classes
  
---  
Definido no namespace `std::pmr`  

```cpp
 polymorphic_allocator(C++17)
(modelo de classe)
 memory_resource(C++17)
(classe)
 pool_options(C++17)
(classe)
 synchronized_pool_resource(C++17)
(classe)
 unsynchronized_pool_resource(C++17)
(classe)
 monotonic_buffer_resource(C++17)
(classe)
```

  
### Funções  
  
Definido no namespace `std::pmr`  

```cpp
 new_delete_resource(C++17)
(função)
 null_memory_resource(C++17)
(função)
 get_default_resource(C++17)
(função)
 set_default_resource(C++17)
(função)
```

  
### Sinopse
```cpp
    namespace std::pmr {
      // class memory_resource
      class memory_resource;
    
      bool operator==(const memory_resource& a, const memory_resource& b) noexcept;
    
      // class template polymorphic_allocator
      template<class Tp> class polymorphic_allocator;
    
      template<class T1, class T2>
        bool operator==(const polymorphic_allocator<T1>& a,
                        const polymorphic_allocator<T2>& b) noexcept;
    
      // global memory resources
      memory_resource* new_delete_resource() noexcept;
      memory_resource* null_memory_resource() noexcept;
      memory_resource* set_default_resource(memory_resource* r) noexcept;
      memory_resource* get_default_resource() noexcept;
    
      // pool resource classes
      struct pool_options;
      class synchronized_pool_resource;
      class unsynchronized_pool_resource;
      class monotonic_buffer_resource;
    }
```

#### Classe [std::pmr::memory_resource](<#/doc/memory/memory_resource>)
```cpp
    namespace std::pmr {
      class memory_resource {
        static constexpr size_t max_align = alignof(max_align_t);   // exposition only
    
      public:
        memory_resource() = default;
        memory_resource(const memory_resource&) = default;
        virtual ~memory_resource();
    
        memory_resource& operator=(const memory_resource&) = default;
    
        void* allocate(size_t bytes, size_t alignment = max_align);
        void deallocate(void* p, size_t bytes, size_t alignment = max_align);
    
        bool is_equal(const memory_resource& other) const noexcept;
    
      private:
        virtual void* do_allocate(size_t bytes, size_t alignment) = 0;
        virtual void do_deallocate(void* p, size_t bytes, size_t alignment) = 0;
    
        virtual bool do_is_equal(const memory_resource& other) const noexcept = 0;
      };
    }
```

#### Modelo de classe [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)
```cpp
    namespace std::pmr {
      template<class Tp = byte> class polymorphic_allocator {
        memory_resource* memory_rsrc;       // exposition only
    
      public:
        using value_type = Tp;
    
        // construtores
        polymorphic_allocator() noexcept;
        polymorphic_allocator(memory_resource* r);
    
        polymorphic_allocator(const polymorphic_allocator& other) = default;
    
        template<class U>
          polymorphic_allocator(const polymorphic_allocator<U>& other) noexcept;
    
        polymorphic_allocator& operator=(const polymorphic_allocator&) = delete;
    
        // funções membro
        Tp* allocate(size_t n);
        void deallocate(Tp* p, size_t n);
    
        void* allocate_bytes(size_t nbytes, size_t alignment = alignof(max_align_t));
        void deallocate_bytes(void* p, size_t nbytes, size_t alignment = alignof(max_align_t));
        template<class T> T* allocate_object(size_t n = 1);
        template<class T> void deallocate_object(T* p, size_t n = 1);
        template<class T, class... CtorArgs>
          T* new_object(CtorArgs&&... ctor_args);
        template<class T> void delete_object(T* p);
    
        template<class T, class... Args>
          void construct(T* p, Args&&... args);
    
        template<class T>
          void destroy(T* p); // obsoleto
    
        polymorphic_allocator select_on_container_copy_construction() const;
    
        memory_resource* resource() const;
      };
    }
```

#### Classe [std::pmr::pool_options](<#/doc/memory/pool_options>)
```cpp
    namespace std::pmr {
      struct pool_options {
        size_t max_blocks_per_chunk = 0;
        size_t largest_required_pool_block = 0;
      };
    }
```

#### Classe [std::pmr::synchronized_pool_resource](<#/doc/memory/synchronized_pool_resource>)
```cpp
    namespace std::pmr {
      class synchronized_pool_resource : public memory_resource {
      public:
        synchronized_pool_resource(const pool_options& opts, memory_resource* upstream);
    
        synchronized_pool_resource()
            : synchronized_pool_resource(pool_options(), get_default_resource()) {}
        explicit synchronized_pool_resource(memory_resource* upstream)
            : synchronized_pool_resource(pool_options(), upstream) {}
        explicit synchronized_pool_resource(const pool_options& opts)
            : synchronized_pool_resource(opts, get_default_resource()) {}
    
        synchronized_pool_resource(const synchronized_pool_resource&) = delete;
        virtual ~synchronized_pool_resource();
    
        synchronized_pool_resource& operator=(const synchronized_pool_resource&) = delete;
    
        void release();
        memory_resource* upstream_resource() const;
        pool_options options() const;
    
      protected:
        void* do_allocate(size_t bytes, size_t alignment) override;
        void do_deallocate(void* p, size_t bytes, size_t alignment) override;
    
        bool do_is_equal(const memory_resource& other) const noexcept override;
      };
    }
```

#### Classe [std::pmr::unsynchronized_pool_resource](<#/doc/memory/unsynchronized_pool_resource>)
```cpp
    namespace std::pmr {
      class unsynchronized_pool_resource : public memory_resource {
      public:
        unsynchronized_pool_resource(const pool_options& opts, memory_resource* upstream);
    
        unsynchronized_pool_resource()
            : unsynchronized_pool_resource(pool_options(), get_default_resource()) {}
        explicit unsynchronized_pool_resource(memory_resource* upstream)
            : unsynchronized_pool_resource(pool_options(), upstream) {}
        explicit unsynchronized_pool_resource(const pool_options& opts)
            : unsynchronized_pool_resource(opts, get_default_resource()) {}
    
        unsynchronized_pool_resource(const unsynchronized_pool_resource&) = delete;
        virtual ~unsynchronized_pool_resource();
    
        unsynchronized_pool_resource& operator=(const unsynchronized_pool_resource&) = delete;
    
        void release();
        memory_resource* upstream_resource() const;
        pool_options options() const;
    
      protected:
        void* do_allocate(size_t bytes, size_t alignment) override;
        void do_deallocate(void* p, size_t bytes, size_t alignment) override;
    
        bool do_is_equal(const memory_resource& other) const noexcept override;
      };
    }
```

#### Classe [std::pmr::monotonic_buffer_resource](<#/doc/memory/monotonic_buffer_resource>)
```cpp
    namespace std::pmr {
      class monotonic_buffer_resource : public memory_resource {
        memory_resource* upstream_rsrc;     // exposition only
        void* current_buffer;               // exposition only
        size_t next_buffer_size;            // exposition only
    
      public:
        explicit monotonic_buffer_resource(memory_resource* upstream);
        monotonic_buffer_resource(size_t initial_size, memory_resource* upstream);
        monotonic_buffer_resource(void* buffer, size_t buffer_size, memory_resource* upstream);
    
        monotonic_buffer_resource()
          : monotonic_buffer_resource(get_default_resource()) {}
        explicit monotonic_buffer_resource(size_t initial_size)
          : monotonic_buffer_resource(initial_size, get_default_resource()) {}
        monotonic_buffer_resource(void* buffer, size_t buffer_size)
          : monotonic_buffer_resource(buffer, buffer_size, get_default_resource()) {}
    
        monotonic_buffer_resource(const monotonic_buffer_resource&) = delete;
    
        virtual ~monotonic_buffer_resource();
    
        monotonic_buffer_resource& operator=(const monotonic_buffer_resource&) = delete;
    
        void release();
        memory_resource* upstream_resource() const;
    
      protected:
        void* do_allocate(size_t bytes, size_t alignment) override;
        void do_deallocate(void* p, size_t bytes, size_t alignment) override;
    
        bool do_is_equal(const memory_resource& other) const noexcept override;
      };
    }
```