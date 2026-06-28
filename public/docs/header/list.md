# Header da biblioteca padrão &lt;list&gt;

Este header faz parte da biblioteca de [containers](<#/doc/container>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para o operador de comparação de três vias
---|---
[ <initializer_list>](<#/doc/header/initializer_list>)(C++11) | Modelo de classe std::initializer_list

### Classes

[ list](<#/doc/container/list>) | lista duplamente encadeada
(modelo de classe)

### Funções

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/list/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de duas `list`s
(modelo de função)
[ std::swap(std::list)](<#/doc/container/list/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase(std::list)erase_if(std::list)](<#/doc/container/list/erase2>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

##### Acesso a Range

[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(modelo de função)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(modelo de função)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(modelo de função)
[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio
(modelo de função)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(modelo de função)

### Sinopse
```cpp
    #include <compare>
    #include <initializer_list>
    
    namespace std {
      // class template list
      template<class T, class Allocator = allocator<T>>
      class list;
    
      template<class T, class Allocator>
      bool operator==(const list<T, Allocator>& x, const list<T, Allocator>& y);
      template<class T, class Allocator>
      /*synth-three-way-result*/<T> operator<=>(const list<T, Allocator>& x,
                                                const list<T, Allocator>& y);
    
      template<class T, class Allocator>
      void swap(list<T, Allocator>& x, list<T, Allocator>& y) noexcept(noexcept(x.swap(y)));
    
      // erasure
      template<class T, class Allocator, class U = T>
      typename list<T, Allocator>::size_type erase(list<T, Allocator>& c, const U& value);
      template<class T, class Allocator, class Predicate>
      typename list<T, Allocator>::size_type erase_if(list<T, Allocator>& c, Predicate pred);
    
      namespace pmr {
        template<class T>
        using list = std::list<T, polymorphic_allocator<T>>;
      }
    }
```

#### Modelo de classe [std::list](<#/doc/container/list>)
```cpp
    namespace std {
      template<class T, class Allocator = allocator<T>>
      class list
      {
      public:
        // types
        using value_type             = T;
        using allocator_type         = Allocator;
        using pointer                = typename allocator_traits<Allocator>::pointer;
        using const_pointer          = typename allocator_traits<Allocator>::const_pointer;
        using reference              = value_type&;
        using const_reference        = const value_type&;
        using size_type              = /* implementation-defined */;
        using difference_type        = /* implementation-defined */;
        using iterator               = /* implementation-defined */;
        using const_iterator         = /* implementation-defined */;
        using reverse_iterator       = std::reverse_iterator<iterator>;
        using const_reverse_iterator = std::reverse_iterator<const_iterator>;
    
        // construct/copy/destroy
        list()
          : list(Allocator())
        {
        }
        explicit list(const Allocator&);
        explicit list(size_type n, const Allocator& = Allocator());
        list(size_type n, const T& value, const Allocator& = Allocator());
        template<class InputIter>
        list(InputIter first, InputIter last, const Allocator& = Allocator());
        template<container-compatible-range<T> R>
        list(from_range_t, R&& rg, const Allocator& = Allocator());
        list(const list& x);
        list(list&& x);
        list(const list&, const type_identity_t<Allocator>&);
        list(list&&, const type_identity_t<Allocator>&);
        list(initializer_list<T>, const Allocator& = Allocator());
        ~list();
        list& operator=(const list& x);
        list& operator=(list&& x) noexcept(
          allocator_traits<Allocator>::is_always_equal::value);
        list& operator=(initializer_list<T>);
        template<class InputIter>
        void assign(InputIter first, InputIter last);
        template<container-compatible-range<T> R>
        void assign_range(R&& rg);
        void assign(size_type n, const T& t);
        void assign(initializer_list<T>);
        allocator_type get_allocator() const noexcept;
    
        // iterators
        iterator begin() noexcept;
        const_iterator begin() const noexcept;
        iterator end() noexcept;
        const_iterator end() const noexcept;
        reverse_iterator rbegin() noexcept;
        const_reverse_iterator rbegin() const noexcept;
        reverse_iterator rend() noexcept;
        const_reverse_iterator rend() const noexcept;
    
        const_iterator cbegin() const noexcept;
        const_iterator cend() const noexcept;
        const_reverse_iterator crbegin() const noexcept;
        const_reverse_iterator crend() const noexcept;
    
        // capacity
        bool empty() const noexcept;
        size_type size() const noexcept;
        size_type max_size() const noexcept;
        void resize(size_type sz);
        void resize(size_type sz, const T& c);
    
        // element access
        reference front();
        const_reference front() const;
        reference back();
        const_reference back() const;
    
        // modifiers
        template<class... Args>
        reference emplace_front(Args&&... args);
        template<class... Args>
        reference emplace_back(Args&&... args);
        void push_front(const T& x);
        void push_front(T&& x);
        template<container-compatible-range<T> R>
        void prepend_range(R&& rg);
        void pop_front();
        void push_back(const T& x);
        void push_back(T&& x);
        template<container-compatible-range<T> R>
        void append_range(R&& rg);
        void pop_back();
    
        template<class... Args>
        iterator emplace(const_iterator position, Args&&... args);
        iterator insert(const_iterator position, const T& x);
        iterator insert(const_iterator position, T&& x);
        iterator insert(const_iterator position, size_type n, const T& x);
        template<class InputIter>
        iterator insert(const_iterator position, InputIter first, InputIter last);
        template<container-compatible-range<T> R>
        iterator insert_range(const_iterator position, R&& rg);
        iterator insert(const_iterator position, initializer_list<T> il);
    
        iterator erase(const_iterator position);
        iterator erase(const_iterator position, const_iterator last);
        void swap(list&) noexcept(allocator_traits<Allocator>::is_always_equal::value);
        void clear() noexcept;
    
        // list operations
        void splice(const_iterator position, list& x);
        void splice(const_iterator position, list&& x);
        void splice(const_iterator position, list& x, const_iterator i);
        void splice(const_iterator position, list&& x, const_iterator i);
        void splice(const_iterator position,
                    list& x,
                    const_iterator first,
                    const_iterator last);
        void splice(const_iterator position,
                    list&& x,
                    const_iterator first,
                    const_iterator last);
    
        size_type remove(const T& value);
        template<class Predicate>
        size_type remove_if(Predicate pred);
    
        size_type unique();
        template<class BinaryPredicate>
        size_type unique(BinaryPredicate binary_pred);
    
        void merge(list& x);
        void merge(list&& x);
        template<class Compare>
        void merge(list& x, Compare comp);
        template<class Compare>
        void merge(list&& x, Compare comp);
    
        void sort();
        template<class Compare>
        void sort(Compare comp);
    
        void reverse() noexcept;
      };
    
      template<class InputIter, class Allocator = allocator</*iter-value-type*/<InputIter>>>
      list(InputIter, InputIter, Allocator = Allocator())
        -> list</*iter-value-type*/<InputIter>, Allocator>;
    
      template<ranges::input_range R, class Allocator = allocator<ranges::range_value_t<R>>>
      list(from_range_t, R&&, Allocator = Allocator())
        -> list<ranges::range_value_t<R>, Allocator>;
    }
```