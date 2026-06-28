# Cabeçalho da biblioteca padrão &lt;unordered_map&gt; (desde C++11)

Este cabeçalho faz parte da biblioteca de [containers](<#/doc/container>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(desde C++20) | Suporte para o operador de comparação de três vias
---|---
[ <initializer_list>](<#/doc/header/initializer_list>)(desde C++11) | Modelo de classe std::initializer_list

### Classes

[ unordered_map](<#/doc/container/unordered_map>)(desde C++11) | coleção de pares chave-valor, com hash pelas chaves, chaves são únicas
(modelo de classe)
[ unordered_multimap](<#/doc/container/unordered_multimap>)(desde C++11) | coleção de pares chave-valor, com hash pelas chaves
(modelo de classe)

### Funções

[ operator==operator!=](<#/doc/container/unordered_map/operator_cmp>)(desde C++11)(desde C++11)(removido em C++20) | compara os valores no unordered_map
(modelo de função)
[ std::swap(std::unordered_map)](<#/doc/container/unordered_map/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase_if(std::unordered_map)](<#/doc/container/unordered_map/erase_if>)(desde C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)
[ operator==operator!=](<#/doc/container/unordered_multimap/operator_cmp>)(desde C++11)(desde C++11)(removido em C++20) | compara os valores no unordered_multimap
(modelo de função)
[ std::swap(std::unordered_multimap)](<#/doc/container/unordered_multimap/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase_if(std::unordered_multimap)](<#/doc/container/unordered_multimap/erase_if>)(desde C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

##### Acesso a Range

[ begincbegin](<#/doc/iterator/begin>)(desde C++11)(desde C++14) | retorna um iterator para o início de um container ou array
(modelo de função)
[ endcend](<#/doc/iterator/end>)(desde C++11)(desde C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(desde C++14) | retorna um reverse iterator para o início de um container ou array
(modelo de função)
[ rendcrend](<#/doc/iterator/rend>)(desde C++14) | retorna um reverse end iterator para um container ou array
(modelo de função)
[ sizessize](<#/doc/iterator/size>)(desde C++17)(desde C++20) | retorna o tamanho de um container ou array
(modelo de função)
[ empty](<#/doc/iterator/empty>)(desde C++17) | verifica se o container está vazio
(modelo de função)
[ data](<#/doc/iterator/data>)(desde C++17) | obtém o ponteiro para o array subjacente
(modelo de função)

### Sinopse
```cpp
    #include <compare>
    #include <initializer_list>
    
    namespace std {
      // class template unordered_map
      template<class Key,
               class T,
               class Hash  = hash<Key>,
               class Pred  = equal_to<Key>,
               class Alloc = allocator<pair<const Key, T>>>
      class unordered_map;
    
      // class template unordered_multimap
      template<class Key,
               class T,
               class Hash  = hash<Key>,
               class Pred  = equal_to<Key>,
               class Alloc = allocator<pair<const Key, T>>>
      class unordered_multimap;
    
      template<class Key, class T, class Hash, class Pred, class Alloc>
      bool operator==(const unordered_map<Key, T, Hash, Pred, Alloc>& a,
                      const unordered_map<Key, T, Hash, Pred, Alloc>& b);
    
      template<class Key, class T, class Hash, class Pred, class Alloc>
      bool operator==(const unordered_multimap<Key, T, Hash, Pred, Alloc>& a,
                      const unordered_multimap<Key, T, Hash, Pred, Alloc>& b);
    
      template<class Key, class T, class Hash, class Pred, class Alloc>
      void swap(unordered_map<Key, T, Hash, Pred, Alloc>& x,
                unordered_map<Key, T, Hash, Pred, Alloc>& y) noexcept(noexcept(x.swap(y)));
    
      template<class Key, class T, class Hash, class Pred, class Alloc>
      void swap(
        unordered_multimap<Key, T, Hash, Pred, Alloc>& x,
        unordered_multimap<Key, T, Hash, Pred, Alloc>& y) noexcept(noexcept(x.swap(y)));
    
      // erasure for unordered_map
      template<class K, class T, class H, class P, class A, class Predicate>
      typename unordered_map<K, T, H, P, A>::size_type erase_if(
        unordered_map<K, T, H, P, A>& c,
        Predicate pred);
    
      // erasure for unordered_multimap
      template<class K, class T, class H, class P, class A, class Predicate>
      typename unordered_multimap<K, T, H, P, A>::size_type erase_if(
        unordered_multimap<K, T, H, P, A>& c,
        Predicate pred);
    
      namespace pmr {
        template<class Key, class T, class Hash = hash<Key>, class Pred = equal_to<Key>>
        using unordered_map =
          std::unordered_map<Key, T, Hash, Pred, polymorphic_allocator<pair<const Key, T>>>;
        template<class Key, class T, class Hash = hash<Key>, class Pred = equal_to<Key>>
        using unordered_multimap = std::
          unordered_multimap<Key, T, Hash, Pred, polymorphic_allocator<pair<const Key, T>>>;
    
      }
    }
```

#### Modelo de classe [std::unordered_map](<#/doc/container/unordered_map>)
```cpp
    namespace std {
      template<class Key,
               class T,
               class Hash      = hash<Key>,
               class Pred      = equal_to<Key>,
               class Allocator = allocator<pair<const Key, T>>>
      class unordered_map
      {
      public:
        // types
        using key_type             = Key;
        using mapped_type          = T;
        using value_type           = pair<const Key, T>;
        using hasher               = Hash;
        using key_equal            = Pred;
        using allocator_type       = Allocator;
        using pointer              = typename allocator_traits<Allocator>::pointer;
        using const_pointer        = typename allocator_traits<Allocator>::const_pointer;
        using reference            = value_type&;
        using const_reference      = const value_type&;
        using size_type            = /* implementation-defined */;
        using difference_type      = /* implementation-defined */;
    
        using iterator             = /* implementation-defined */;
        using const_iterator       = /* implementation-defined */;
        using local_iterator       = /* implementation-defined */;
        using const_local_iterator = /* implementation-defined */;
        using node_type            = /* unspecified */;
        using insert_return_type   = /*insert-return-type*/<iterator, node_type>;
    
        // construct/copy/destroy
        unordered_map();
        explicit unordered_map(size_type n,
                               const hasher& hf        = hasher(),
                               const key_equal& eql    = key_equal(),
                               const allocator_type& a = allocator_type());
        template<class InputIter>
        unordered_map(InputIter f,
                      InputIter l,
                      size_type n             = /* see description */,
                      const hasher& hf        = hasher(),
                      const key_equal& eql    = key_equal(),
                      const allocator_type& a = allocator_type());
    
        template<container-compatible-range<value_type> R>
        unordered_map(from_range_t,
                      R&& rg,
                      size_type n             = /* see description */,
                      const hasher& hf        = hasher(),
                      const key_equal& eql    = key_equal(),
                      const allocator_type& a = allocator_type());
        unordered_map(const unordered_map&);
        unordered_map(unordered_map&&);
        explicit unordered_map(const Allocator&);
        unordered_map(const unordered_map&, const type_identity_t<Allocator>&);
        unordered_map(unordered_map&&, const type_identity_t<Allocator>&);
        unordered_map(initializer_list<value_type> il,
                      size_type n             = /* see description */,
                      const hasher& hf        = hasher(),
                      const key_equal& eql    = key_equal(),
                      const allocator_type& a = allocator_type());
        unordered_map(size_type n, const allocator_type& a)
          : unordered_map(n, hasher(), key_equal(), a)
        {
        }
        unordered_map(size_type n, const hasher& hf, const allocator_type& a)
          : unordered_map(n, hf, key_equal(), a)
        {
        }
        template<class InputIter>
        unordered_map(InputIter f, InputIter l, size_type n, const allocator_type& a)
          : unordered_map(f, l, n, hasher(), key_equal(), a)
        {
        }
        template<class InputIter>
        unordered_map(InputIter f,
                      InputIter l,
                      size_type n,
                      const hasher& hf,
                      const allocator_type& a)
          : unordered_map(f, l, n, hf, key_equal(), a)
        {
        }
        template<container-compatible-range<value_type> R>
        unordered_map(from_range_t, R&& rg, size_type n, const allocator_type& a)
          : unordered_map(from_range, std::forward<R>(rg), n, hasher(), key_equal(), a)
        {
        }
        template<container-compatible-range<value_type> R>
        unordered_map(from_range_t,
                      R&& rg,
                      size_type n,
                      const hasher& hf,
                      const allocator_type& a)
          : unordered_map(from_range, std::forward<R>(rg), n, hf, key_equal(), a)
        {
        }
        unordered_map(initializer_list<value_type> il, size_type n, const allocator_type& a)
          : unordered_map(il, n, hasher(), key_equal(), a)
        {
        }
        unordered_map(initializer_list<value_type> il,
                      size_type n,
                      const hasher& hf,
                      const allocator_type& a)
          : unordered_map(il, n, hf, key_equal(), a)
        {
        }
        ~unordered_map();
        unordered_map& operator=(const unordered_map&);
        unordered_map& operator=(unordered_map&&) noexcept(
          allocator_traits<Allocator>::is_always_equal::value&&
            is_nothrow_move_assignable_v<Hash>&& is_nothrow_move_assignable_v<Pred>);
        unordered_map& operator=(initializer_list<value_type>);
        allocator_type get_allocator() const noexcept;
    
        // iterators
        iterator begin() noexcept;
        const_iterator begin() const noexcept;
        iterator end() noexcept;
        const_iterator end() const noexcept;
        const_iterator cbegin() const noexcept;
        const_iterator cend() const noexcept;
    
        // capacity
        bool empty() const noexcept;
        size_type size() const noexcept;
        size_type max_size() const noexcept;
    
        // modifiers
        template<class... Args>
        pair<iterator, bool> emplace(Args&&... args);
        template<class... Args>
        iterator emplace_hint(const_iterator position, Args&&... args);
        pair<iterator, bool> insert(const value_type& obj);
        pair<iterator, bool> insert(value_type&& obj);
        template<class P>
        pair<iterator, bool> insert(P&& obj);
        iterator insert(const_iterator hint, const value_type& obj);
        iterator insert(const_iterator hint, value_type&& obj);
        template<class P>
        iterator insert(const_iterator hint, P&& obj);
        template<class InputIter>
        void insert(InputIter first, InputIter last);
        template<container-compatible-range<value_type> R>
        void insert_range(R&& rg);
        void insert(initializer_list<value_type>);
    
        node_type extract(const_iterator position);
        node_type extract(const key_type& x);
        template<class K>
        node_type extract(K&& x);
        insert_return_type insert(node_type&& nh);
        iterator insert(const_iterator hint, node_type&& nh);
    
        template<class... Args>
        pair<iterator, bool> try_emplace(const key_type& k, Args&&... args);
        template<class... Args>
        pair<iterator, bool> try_emplace(key_type&& k, Args&&... args);
        template<class K, class... Args>
        pair<iterator, bool> try_emplace(K&& k, Args&&... args);
        template<class... Args>
        iterator try_emplace(const_iterator hint, const key_type& k, Args&&... args);
        template<class... Args>
        iterator try_emplace(const_iterator hint, key_type&& k, Args&&... args);
        template<class K, class... Args>
        iterator try_emplace(const_iterator hint, K&& k, Args&&... args);
        template<class M>
        pair<iterator, bool> insert_or_assign(const key_type& k, M&& obj);
        template<class M>
        pair<iterator, bool> insert_or_assign(key_type&& k, M&& obj);
        template<class K, class M>
        pair<iterator, bool> insert_or_assign(K&& k, M&& obj);
        template<class M>
        iterator insert_or_assign(const_iterator hint, const key_type& k, M&& obj);
        template<class M>
        iterator insert_or_assign(const_iterator hint, key_type&& k, M&& obj);
        template<class K, class M>
        iterator insert_or_assign(const_iterator hint, K&& k, M&& obj);
    
        iterator erase(iterator position);
        iterator erase(const_iterator position);
        size_type erase(const key_type& k);
        template<class K>
        size_type erase(K&& x);
        iterator erase(const_iterator first, const_iterator last);
        void swap(unordered_map&) noexcept(
          allocator_traits<Allocator>::is_always_equal::value&& is_nothrow_swappable_v<Hash>&&
            is_nothrow_swappable_v<Pred>);
        void clear() noexcept;
    
        template<class H2, class P2>
        void merge(unordered_map<Key, T, H2, P2, Allocator>& source);
        template<class H2, class P2>
        void merge(unordered_map<Key, T, H2, P2, Allocator>&& source);
        template<class H2, class P2>
        void merge(unordered_multimap<Key, T, H2, P2, Allocator>& source);
        template<class H2, class P2>
        void merge(unordered_multimap<Key, T, H2, P2, Allocator>&& source);
    
        // observers
        hasher hash_function() const;
        key_equal key_eq() const;
    
        // map operations
        iterator find(const key_type& k);
        const_iterator find(const key_type& k) const;
        template<class K>
        iterator find(const K& k);
        template<class K>
        const_iterator find(const K& k) const;
        size_type count(const key_type& k) const;
        template<class K>
        size_type count(const K& k) const;
        bool contains(const key_type& k) const;
        template<class K>
        bool contains(const K& k) const;
        pair<iterator, iterator> equal_range(const key_type& k);
        pair<const_iterator, const_iterator> equal_range(const key_type& k) const;
        template<class K>
        pair<iterator, iterator> equal_range(const K& k);
        template<class K>
        pair<const_iterator, const_iterator> equal_range(const K& k) const;
    
        // element access
        mapped_type& operator;
        mapped_type& operator;
        template<class K>
        mapped_type& operator;
        mapped_type& at(const key_type& k);
        const mapped_type& at(const key_type& k) const;
        template<class K>
        mapped_type& at(const K& k);
        template<class K>
        const mapped_type& at(const K& k) const;
    
        // bucket interface
        size_type bucket_count() const noexcept;
        size_type max_bucket_count() const noexcept;
        size_type bucket_size(size_type n) const;
        size_type bucket(const key_type& k) const;
        template<class K>
        size_type bucket(const K& k) const;
        local_iterator begin(size_type n);
        const_local_iterator begin(size_type n) const;
        local_iterator end(size_type n);
        const_local_iterator end(size_type n) const;
        const_local_iterator cbegin(size_type n) const;
        const_local_iterator cend(size_type n) const;
    
        // hash policy
        float load_factor() const noexcept;
        float max_load_factor() const noexcept;
        void max_load_factor(float z);
        void rehash(size_type n);
        void reserve(size_type n);
      };
    
      template<class InputIter,
               class Hash      = hash</*iter-key-type*/<InputIter>>,
               class Pred      = equal_to</*iter-key-type*/<InputIter>>,
               class Allocator = allocator</*iter-to-alloc-type*/<InputIter>>>
      unordered_map(InputIter,
                    InputIter,
                    typename /* see description */ ::size_type = /* see description */,
                    Hash                                       = Hash(),
                    Pred                                       = Pred(),
                    Allocator = Allocator()) -> unordered_map</*iter-key-type*/<InputIter>,
                                                              /*iter-mapped-type*/<InputIter>,
                                                              Hash,
                                                              Pred,
                                                              Allocator>;
    
      template<ranges::input_range R,
               class Hash      = hash</*range-key-type*/<R>>,
               class Pred      = equal_to</*range-key-type*/<R>>,
               class Allocator = allocator</*range-to-alloc-type*/<R>>>
      unordered_map(from_range_t,
                    R&&,
                    typename /* see description */ ::size_type = /* see description */,
                    Hash                                       = Hash(),
                    Pred                                       = Pred(),
                    Allocator = Allocator()) -> unordered_map</*range-key-type*/<R>,
                                                              /*range-mapped-type*/<R>,
                                                              Hash,
                                                              Pred,
                                                              Allocator>;
    
      template<class Key,
               class T,
               class Hash      = hash<Key>,
               class Pred      = equal_to<Key>,
               class Allocator = allocator<pair<const Key, T>>>
      unordered_map(initializer_list<pair<Key, T>>,
                    typename /* see description */ ::size_type = /* see description */,
                    Hash                                       = Hash(),
                    Pred                                       = Pred(),
                    Allocator = Allocator()) -> unordered_map<Key, T, Hash, Pred, Allocator>;
    
      template<class InputIter, class Allocator>
      unordered_map(InputIter,
                    InputIter,
                    typename /* see description */ ::size_type,
                    Allocator) -> unordered_map</*iter-key-type*/<InputIter>,
                                                /*iter-mapped-type*/<InputIter>,
                                                hash</*iter-key-type*/<InputIter>>,
                                                equal_to</*iter-key-type*/<InputIter>>,
                                                Allocator>;
    
      template<class InputIter, class Allocator>
      unordered_map(InputIter, InputIter, Allocator)
        -> unordered_map</*iter-key-type*/<InputIter>,
                         /*iter-mapped-type*/<InputIter>,
                         hash</*iter-key-type*/<InputIter>>,
                         equal_to</*iter-key-type*/<InputIter>>,
                         Allocator>;
    
      template<class InputIter, class Hash, class Allocator>
      unordered_map(InputIter,
                    InputIter,
                    typename /* see description */ ::size_type,
                    Hash,
                    Allocator) -> unordered_map</*iter-key-type*/<InputIter>,
                                                /*iter-mapped-type*/<InputIter>,
                                                Hash,
                                                equal_to</*iter-key-type*/<InputIter>>,
                                                Allocator>;
    
      template<ranges::input_range R, class Allocator>
      unordered_map(from_range_t, R&&, typename /* see description */ ::size_type, Allocator)
        -> unordered_map</*range-key-type*/<R>,
                         /*range-mapped-type*/<R>,
                         hash</*range-key-type*/<R>>,
                         equal_to</*range-key-type*/<R>>,
                         Allocator>;
    
      template<ranges::input_range R, class Allocator>
      unordered_map(from_range_t, R&&, Allocator)
        -> unordered_map</*range-key-type*/<R>,
                         /*range-mapped-type*/<R>,
                         hash</*range-key-type*/<R>>,
                         equal_to</*range-key-type*/<R>>,
                         Allocator>;
    
      template<ranges::input_range R, class Hash, class Allocator>
      unordered_map(from_range_t,
                    R&&,
                    typename /* see description */ ::size_type,
                    Hash,
                    Allocator) -> unordered_map</*range-key-type*/<R>,
                                                /*range-mapped-type*/<R>,
                                                Hash,
                                                equal_to</*range-key-type*/<R>>,
                                                Allocator>;
    
      template<class Key, class T, class Allocator>
      unordered_map(initializer_list<pair<Key, T>>,
                    typename /* see description */ ::size_type,
                    Allocator) -> unordered_map<Key, T, hash<Key>, equal_to<Key>, Allocator>;
    
      template<class Key, class T, class Allocator>
      unordered_map(initializer_list<pair<Key, T>>, Allocator)
        -> unordered_map<Key, T, hash<Key>, equal_to<Key>, Allocator>;
    
      template<class Key, class T, class Hash, class Allocator>
      unordered_map(initializer_list<pair<Key, T>>,
                    typename /* see description */ ::size_type,
                    Hash,
                    Allocator) -> unordered_map<Key, T, Hash, equal_to<Key>, Allocator>;
    }
```

#### Modelo de classe [std::unordered_multimap](<#/doc/container/unordered_multimap>)
```cpp
    namespace std {
      template<class Key,
               class T,
               class Hash      = hash<Key>,
               class Pred      = equal_to<Key>,
               class Allocator = allocator<pair<const Key, T>>>
      class unordered_multimap
      {
      public:
        // types
        using key_type             = Key;
        using mapped_type          = T;
        using value_type           = pair<const Key, T>;
        using hasher               = Hash;
        using key_equal            = Pred;
        using allocator_type       = Allocator;
        using pointer              = typename allocator_traits<Allocator>::pointer;
        using const_pointer        = typename allocator_traits<Allocator>::const_pointer;
        using reference            = value_type&;
        using const_reference      = const value_type&;
        using size_type            = /* implementation-defined */;
        using difference_type      = /* implementation-defined */;
    
        using iterator             = /* implementation-defined */;
        using const_iterator       = /* implementation-defined */;
        using local_iterator       = /* implementation-defined */;
        using const_local_iterator = /* implementation-defined */;
        using node_type            = /* unspecified */;
    
        // construct/copy/destroy
        unordered_multimap();
        explicit unordered_multimap(size_type n,
                                    const hasher& hf        = hasher(),
                                    const key_equal& eql    = key_equal(),
                                    const allocator_type& a = allocator_type());
        template<class InputIter>
        unordered_multimap(InputIter f,
                           InputIter l,
                           size_type n             = /* see description */,
                           const hasher& hf        = hasher(),
                           const key_equal& eql    = key_equal(),
                           const allocator_type& a = allocator_type());
        template<container-compatible-range<value_type> R>
        unordered_multimap(from_range_t,
                           R&& rg,
                           size_type n             = /* see description */,
                           const hasher& hf        = hasher(),
                           const key_equal& eql    = key_equal(),
                           const allocator_type& a = allocator_type());
        unordered_multimap(const unordered_multimap&);
        unordered_multimap(unordered_multimap&&);
        explicit unordered_multimap(const Allocator&);
        unordered_multimap(const unordered_multimap&, const type_identity_t<Allocator>&);
        unordered_multimap(unordered_multimap&&, const type_identity_t<Allocator>&);
        unordered_multimap(initializer_list<value_type> il,
                           size_type n             = /* see description */,
                           const hasher& hf        = hasher(),
                           const key_equal& eql    = key_equal(),
                           const allocator_type& a = allocator_type());
        unordered_multimap(size_type n, const allocator_type& a)
          : unordered_multimap(n, hasher(), key_equal(), a)
        {
        }
        unordered_multimap(size_type n, const hasher& hf, const allocator_type& a)
          : unordered_multimap(n, hf, key_equal(), a)
        {
        }
        template<class InputIter>
        unordered_multimap(InputIter f, InputIter l, size_type n, const allocator_type& a)
          : unordered_multimap(f, l, n, hasher(), key_equal(), a)
        {
        }
        template<class InputIter>
        unordered_multimap(InputIter f,
                           InputIter l,
                           size_type n,
                           const hasher& hf,
                           const allocator_type& a)
          : unordered_multimap(f, l, n, hf, key_equal(), a)
        {
        }
        template<container-compatible-range<value_type> R>
        unordered_multimap(from_range_t, R&& rg, size_type n, const allocator_type& a)
          : unordered_multimap(from_range, std::forward<R>(rg), n, hasher(), key_equal(), a)
        {
        }
        template<container-compatible-range<value_type> R>
        unordered_multimap(from_range_t,
                           R&& rg,
                           size_type n,
                           const hasher& hf,
                           const allocator_type& a)
          : unordered_multimap(from_range, std::forward<R>(rg), n, hf, key_equal(), a)
        {
        }
        unordered_multimap(initializer_list<value_type> il,
                           size_type n,
                           const allocator_type& a)
          : unordered_multimap(il, n, hasher(), key_equal(), a)
        {
        }
        unordered_multimap(initializer_list<value_type> il,
                           size_type n,
                           const hasher& hf,
                           const allocator_type& a)
          : unordered_multimap(il, n, hf, key_equal(), a)
        {
        }
        ~unordered_multimap();
        unordered_multimap& operator=(const unordered_multimap&);
        unordered_multimap& operator=(unordered_multimap&&) noexcept(
          allocator_traits<Allocator>::is_always_equal::value&&
            is_nothrow_move_assignable_v<Hash>&& is_nothrow_move_assignable_v<Pred>);
        unordered_multimap& operator=(initializer_list<value_type>);
        allocator_type get_allocator() const noexcept;
    
        // iterators
        iterator begin() noexcept;
        const_iterator begin() const noexcept;
        iterator end() noexcept;
        const_iterator end() const noexcept;
        const_iterator cbegin() const noexcept;
        const_iterator cend() const noexcept;
    
        // capacity
        bool empty() const noexcept;
        size_type size() const noexcept;
        size_type max_size() const noexcept;
    
        // modifiers
        template<class... Args>
        iterator emplace(Args&&... args);
        template<class... Args>
        iterator emplace_hint(const_iterator position, Args&&... args);
        iterator insert(const value_type& obj);
        iterator insert(value_type&& obj);
        template<class P>
        iterator insert(P&& obj);
        iterator insert(const_iterator hint, const value_type& obj);
        iterator insert(const_iterator hint, value_type&& obj);
        template<class P>
        iterator insert(const_iterator hint, P&& obj);
        template<class InputIter>
        void insert(InputIter first, InputIter last);
        template<container-compatible-range<value_type> R>
        void insert_range(R&& rg);
        void insert(initializer_list<value_type>);
    
        node_type extract(const_iterator position);
        node_type extract(const key_type& x);
        template<class K>
        node_type extract(K&& x);
        iterator insert(node_type&& nh);
        iterator insert(const_iterator hint, node_type&& nh);
    
        iterator erase(iterator position);
        iterator erase(const_iterator position);
        size_type erase(const key_type& k);
        template<class K>
        size_type erase(K&& x);
        iterator erase(const_iterator first, const_iterator last);
        void swap(unordered_multimap&) noexcept(
          allocator_traits<Allocator>::is_always_equal::value&& is_nothrow_swappable_v<Hash>&&
            is_nothrow_swappable_v<Pred>);
        void clear() noexcept;
    
        template<class H2, class P2>
        void merge(unordered_multimap<Key, T, H2, P2, Allocator>& source);
        template<class H2, class P2>
        void merge(unordered_multimap<Key, T, H2, P2, Allocator>&& source);
        template<class H2, class P2>
        void merge(unordered_map<Key, T, H2, P2, Allocator>& source);
        template<class H2, class P2>
        void merge(unordered_map<Key, T, H2, P2, Allocator>&& source);
    
        // observers
        hasher hash_function() const;
        key_equal key_eq() const;
    
        // map operations
        iterator find(const key_type& k);
        const_iterator find(const key_type& k) const;
        template<class K>
        iterator find(const K& k);
        template<class K>
        const_iterator find(const K& k) const;
        size_type count(const key_type& k) const;
```
```cpp
        template<class K>
        size_type count(const K& k) const;
        bool contains(const key_type& k) const;
        template<class K>
        bool contains(const K& k) const;
        pair<iterator, iterator> equal_range(const key_type& k);
        pair<const_iterator, const_iterator> equal_range(const key_type& k) const;
        template<class K>
        pair<iterator, iterator> equal_range(const K& k);
        template<class K>
        pair<const_iterator, const_iterator> equal_range(const K& k) const;
     
        // interface do bucket
        size_type bucket_count() const noexcept;
        size_type max_bucket_count() const noexcept;
        size_type bucket_size(size_type n) const;
        size_type bucket(const key_type& k) const;
        template<class K>
        size_type bucket(const K& k) const;
        local_iterator begin(size_type n);
        const_local_iterator begin(size_type n) const;
        local_iterator end(size_type n);
        const_local_iterator end(size_type n) const;
        const_local_iterator cbegin(size_type n) const;
        const_local_iterator cend(size_type n) const;
     
        // política de hash
        float load_factor() const noexcept;
        float max_load_factor() const noexcept;
        void max_load_factor(float z);
        void rehash(size_type n);
        void reserve(size_type n);
      };
     
      template<class InputIter,
               class Hash      = hash</*iter-key-type*/<InputIter>>,
               class Pred      = equal_to</*iter-key-type*/<InputIter>>,
               class Allocator = allocator</*iter-to-alloc-type*/<InputIter>>>
      unordered_multimap(InputIter,
                         InputIter,
                         typename /* see description */ ::size_type = /* see description */,
                         Hash                                       = Hash(),
                         Pred                                       = Pred(),
                         Allocator                                  = Allocator())
        -> unordered_multimap</*iter-key-type*/<InputIter>,
                              /*iter-mapped-type*/<InputIter>,
                              Hash,
                              Pred,
                              Allocator>;
     
      template<ranges::input_range R,
               class Hash      = hash</*range-key-type*/<R>>,
               class Pred      = equal_to</*range-key-type*/<R>>,
               class Allocator = allocator</*range-to-alloc-type*/<R>>>
      unordered_multimap(from_range_t,
                         R&&,
                         typename /* see description */ ::size_type = /* see description */,
                         Hash                                       = Hash(),
                         Pred                                       = Pred(),
                         Allocator                                  = Allocator())
        -> unordered_multimap</*range-key-type*/<R>,
                              /*range-mapped-type*/<R>,
                              Hash,
                              Pred,
                              Allocator>;
     
      template<class Key,
               class T,
               class Hash      = hash<Key>,
               class Pred      = equal_to<Key>,
               class Allocator = allocator<pair<const Key, T>>>
      unordered_multimap(initializer_list<pair<Key, T>>,
                         typename /* see description */ ::size_type = /* see description */,
                         Hash                                       = Hash(),
                         Pred                                       = Pred(),
                         Allocator                                  = Allocator())
        -> unordered_multimap<Key, T, Hash, Pred, Allocator>;
     
      template<class InputIter, class Allocator>
      unordered_multimap(InputIter,
                         InputIter,
                         typename /* see description */ ::size_type,
                         Allocator)
        -> unordered_multimap</*iter-key-type*/<InputIter>,
                              /*iter-mapped-type*/<InputIter>,
                              hash</*iter-key-type*/<InputIter>>,
                              equal_to</*iter-key-type*/<InputIter>>,
                              Allocator>;
     
      template<class InputIter, class Allocator>
      unordered_multimap(InputIter, InputIter, Allocator)
        -> unordered_multimap</*iter-key-type*/<InputIter>,
                              /*iter-mapped-type*/<InputIter>,
                              hash</*iter-key-type*/<InputIter>>,
                              equal_to</*iter-key-type*/<InputIter>>,
                              Allocator>;
     
      template<class InputIter, class Hash, class Allocator>
      unordered_multimap(InputIter,
                         InputIter,
                         typename /* see description */ ::size_type,
                         Hash,
                         Allocator)
        -> unordered_multimap</*iter-key-type*/<InputIter>,
                              /*iter-mapped-type*/<InputIter>,
                              Hash,
                              equal_to</*iter-key-type*/<InputIter>>,
                              Allocator>;
     
      template<ranges::input_range R, class Allocator>
      unordered_multimap(from_range_t,
                         R&&,
                         typename /* see description */ ::size_type,
                         Allocator) -> unordered_multimap</*range-key-type*/<R>,
                                                          /*range-mapped-type*/<R>,
                                                          hash</*range-key-type*/<R>>,
                                                          equal_to</*range-key-type*/<R>>,
                                                          Allocator>;
     
      template<ranges::input_range R, class Allocator>
      unordered_multimap(from_range_t, R&&, Allocator)
        -> unordered_multimap</*range-key-type*/<R>,
                              /*range-mapped-type*/<R>,
                              hash</*range-key-type*/<R>>,
                              equal_to</*range-key-type*/<R>>,
                              Allocator>;
     
      template<ranges::input_range R, class Hash, class Allocator>
      unordered_multimap(from_range_t,
                         R&&,
                         typename /* see description */ ::size_type,
                         Hash,
                         Allocator) -> unordered_multimap</*range-key-type*/<R>,
                                                          /*range-mapped-type*/<R>,
                                                          Hash,
                                                          equal_to</*range-key-type*/<R>>,
                                                          Allocator>;
     
      template<class Key, class T, class Allocator>
      unordered_multimap(initializer_list<pair<Key, T>>,
                         typename /* see description */ ::size_type,
                         Allocator)
        -> unordered_multimap<Key, T, hash<Key>, equal_to<Key>, Allocator>;
     
      template<class Key, class T, class Allocator>
      unordered_multimap(initializer_list<pair<Key, T>>, Allocator)
        -> unordered_multimap<Key, T, hash<Key>, equal_to<Key>, Allocator>;
     
      template<class Key, class T, class Hash, class Allocator>
      unordered_multimap(initializer_list<pair<Key, T>>,
                         typename /* see description */ ::size_type,
                         Hash,
                         Allocator)
        -> unordered_multimap<Key, T, Hash, equal_to<Key>, Allocator>;
    }
```