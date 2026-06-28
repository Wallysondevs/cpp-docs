# Cabeçalho da biblioteca padrão &lt;vector&gt;

Este cabeçalho faz parte da biblioteca de [containers](<#/doc/container>).

### Inclui

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para [operador de comparação de três vias](<#/doc/language/operator_comparison>)
---|---
[ <initializer_list>](<#/doc/header/initializer_list>)(C++11) | template de classe [std::initializer_list](<#/doc/utility/initializer_list>)

### Classes

[ vector](<#/doc/container/vector>) | array contíguo dinâmico
(template de classe)
[ vector&lt;bool&gt;](<#/doc/container/vector_bool>) | bitset dinâmico com eficiência de espaço
(especialização de template de classe)
[ std::hash<std::vector&lt;bool&gt;>](<#/doc/container/vector_bool/hash>)(C++11) | suporte a hash para [std::vector](<#/doc/container/vector>)&lt;bool&gt;
(especialização de template de classe)

##### Declarações antecipadas

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```cpp
 hash(C++11)
(template de classe)
```

### Funções

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/vector/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `vector`s
(template de função)
[ std::swap(std::vector)](<#/doc/container/vector/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase(std::vector)erase_if(std::vector)](<#/doc/container/vector/erase2>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(template de função)

##### Acesso a range

[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(template de função)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(template de função)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(template de função)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(template de função)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(template de função)
[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio
(template de função)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(template de função)

### Synopsis
```cpp
    #include <compare>
    #include <initializer_list>
    
    namespace std {
      // class template vector
      template<class T, class Allocator = allocator<T>>
      class vector;
    
      template<class T, class Allocator>
      constexpr bool operator==(const vector<T, Allocator>& x, const vector<T, Allocator>& y);
      template<class T, class Allocator>
      constexpr /*synth-three-way-result*/<T> operator<=>(const vector<T, Allocator>& x,
                                                          const vector<T, Allocator>& y);
    
      template<class T, class Allocator>
      constexpr void swap(vector<T, Allocator>& x,
                          vector<T, Allocator>& y) noexcept(noexcept(x.swap(y)));
    
      // erasure
      template<class T, class Allocator, class U = T>
      constexpr typename vector<T, Allocator>::size_type erase(vector<T, Allocator>& c,
                                                               const U& value);
      template<class T, class Allocator, class Predicate>
      constexpr typename vector<T, Allocator>::size_type erase_if(vector<T, Allocator>& c,
                                                                  Predicate pred);
    
      namespace pmr {
        template<class T>
        using vector = std::vector<T, polymorphic_allocator<T>>;
      }
    
      // specialization of vector for bool
      // partial class template specialization vector<bool, Allocator>
      template<class Allocator>
      class vector<bool, Allocator>;
    
      template<class T>
      constexpr bool /*is-vector-bool-reference*/ = /* see description */; // apenas para exposição
    
      // hash support
      template<class T>
      struct hash;
      template<class Allocator>
      struct hash<vector<bool, Allocator>>;
    
      // formatter specialization for vector<bool>
      template<class T, class CharT>
        requires /*is-vector-bool-reference*/<T>
      struct formatter<T, CharT>;
    }
```

#### Template de classe [std::vector](<#/doc/container/vector>)
```cpp
    namespace std {
      template<class T, class Allocator = allocator<T>>
      class vector
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
        constexpr vector() noexcept(noexcept(Allocator()))
          : vector(Allocator())
        {
        }
        constexpr explicit vector(const Allocator&) noexcept;
        constexpr explicit vector(size_type n, const Allocator& = Allocator());
        constexpr vector(size_type n, const T& value, const Allocator& = Allocator());
        template<class InputIter>
        constexpr vector(InputIter first, InputIter last, const Allocator& = Allocator());
        template<container-compatible-range<T> R>
        constexpr vector(from_range_t, R&& rg, const Allocator& = Allocator());
        constexpr vector(const vector& x);
        constexpr vector(vector&&) noexcept;
        constexpr vector(const vector&, const type_identity_t<Allocator>&);
        constexpr vector(vector&&, const type_identity_t<Allocator>&);
        constexpr vector(initializer_list<T>, const Allocator& = Allocator());
        constexpr ~vector();
        constexpr vector& operator=(const vector& x);
        constexpr vector& operator=(vector&& x) noexcept(
          allocator_traits<Allocator>::propagate_on_container_move_assignment::value ||
          allocator_traits<Allocator>::is_always_equal::value);
        constexpr vector& operator=(initializer_list<T>);
        template<class InputIter>
        constexpr void assign(InputIter first, InputIter last);
        template<container-compatible-range<T> R>
        constexpr void assign_range(R&& rg);
        constexpr void assign(size_type n, const T& u);
        constexpr void assign(initializer_list<T>);
        constexpr allocator_type get_allocator() const noexcept;
    
        // iterators
        constexpr iterator begin() noexcept;
        constexpr const_iterator begin() const noexcept;
        constexpr iterator end() noexcept;
        constexpr const_iterator end() const noexcept;
        constexpr reverse_iterator rbegin() noexcept;
        constexpr const_reverse_iterator rbegin() const noexcept;
        constexpr reverse_iterator rend() noexcept;
        constexpr const_reverse_iterator rend() const noexcept;
    
        constexpr const_iterator cbegin() const noexcept;
        constexpr const_iterator cend() const noexcept;
        constexpr const_reverse_iterator crbegin() const noexcept;
        constexpr const_reverse_iterator crend() const noexcept;
    
        // capacity
        constexpr bool empty() const noexcept;
        constexpr size_type size() const noexcept;
        constexpr size_type max_size() const noexcept;
        constexpr size_type capacity() const noexcept;
        constexpr void resize(size_type sz);
        constexpr void resize(size_type sz, const T& c);
        constexpr void reserve(size_type n);
        constexpr void shrink_to_fit();
    
        // element access
        constexpr reference operator;
        constexpr const_reference operator const;
        constexpr const_reference at(size_type n) const;
        constexpr reference at(size_type n);
        constexpr reference front();
        constexpr const_reference front() const;
        constexpr reference back();
        constexpr const_reference back() const;
    
        // data access
        constexpr T* data() noexcept;
        constexpr const T* data() const noexcept;
    
        // modifiers
        template<class... Args>
        constexpr reference emplace_back(Args&&... args);
        constexpr void push_back(const T& x);
        constexpr void push_back(T&& x);
        template<container-compatible-range<T> R>
        constexpr void append_range(R&& rg);
        constexpr void pop_back();
    
        template<class... Args>
        constexpr iterator emplace(const_iterator position, Args&&... args);
        constexpr iterator insert(const_iterator position, const T& x);
        constexpr iterator insert(const_iterator position, T&& x);
        constexpr iterator insert(const_iterator position, size_type n, const T& x);
        template<class InputIter>
        constexpr iterator insert(const_iterator position, InputIter first, InputIter last);
        template<container-compatible-range<T> R>
        constexpr iterator insert_range(const_iterator position, R&& rg);
        constexpr iterator insert(const_iterator position, initializer_list<T> il);
        constexpr iterator erase(const_iterator position);
        constexpr iterator erase(const_iterator first, const_iterator last);
        constexpr void swap(vector&) noexcept(
          allocator_traits<Allocator>::propagate_on_container_swap::value ||
          allocator_traits<Allocator>::is_always_equal::value);
        constexpr void clear() noexcept;
      };
    
      template<class InputIter, class Allocator = allocator</*iter-value-type*/<InputIter>>>
      vector(InputIter, InputIter, Allocator = Allocator())
        -> vector</*iter-value-type*/<InputIter>, Allocator>;
    
      template<ranges::input_range R, class Allocator = allocator<ranges::range_value_t<R>>>
      vector(from_range_t, R&&, Allocator = Allocator())
        -> vector<ranges::range_value_t<R>, Allocator>;
    }
```

#### Especialização do template de classe [std::vector](<#/doc/container/vector>) para bool
```cpp
    namespace std {
      template<class Allocator>
      class vector<bool, Allocator>
      {
      public:
        // types
        using value_type             = bool;
        using allocator_type         = Allocator;
        using pointer                = /* implementation-defined */;
        using const_pointer          = /* implementation-defined */;
        using const_reference        = bool;
        using size_type              = /* implementation-defined */;
        using difference_type        = /* implementation-defined */;
        using iterator               = /* implementation-defined */;
        using const_iterator         = /* implementation-defined */;
        using reverse_iterator       = std::reverse_iterator<iterator>;
        using const_reverse_iterator = std::reverse_iterator<const_iterator>;
    
        // bit reference
        class reference
        {
          constexpr reference() noexcept;
    
        public:
          constexpr reference(const reference&) = default;
          constexpr ~reference();
          constexpr operator bool() const noexcept;
          constexpr reference& operator=(bool x) noexcept;
          constexpr reference& operator=(const reference& x) noexcept;
          constexpr const reference& operator=(bool x) const noexcept;
          constexpr void flip() noexcept; // inverte o bit
        };
    
        // construct/copy/destroy
        constexpr vector() noexcept(noexcept(Allocator()))
          : vector(Allocator())
        {
        }
        constexpr explicit vector(const Allocator&) noexcept;
        constexpr explicit vector(size_type n, const Allocator& = Allocator());
        constexpr vector(size_type n, const bool& value, const Allocator& = Allocator());
        template<class InputIter>
        constexpr vector(InputIter first, InputIter last, const Allocator& = Allocator());
        template<container-compatible-range<bool> R>
        constexpr vector(from_range_t, R&& rg, const Allocator& = Allocator());
        constexpr vector(const vector& x);
        constexpr vector(vector&& x) noexcept;
        constexpr vector(const vector&, const type_identity_t<Allocator>&);
        constexpr vector(vector&&, const type_identity_t<Allocator>&);
        constexpr vector(initializer_list<bool>, const Allocator& = Allocator());
        constexpr ~vector();
        constexpr vector& operator=(const vector& x);
        constexpr vector& operator=(vector&& x) noexcept(
          allocator_traits<Allocator>::propagate_on_container_move_assignment::value ||
          allocator_traits<Allocator>::is_always_equal::value);
        constexpr vector& operator=(initializer_list<bool>);
        template<class InputIter>
        constexpr void assign(InputIter first, InputIter last);
        template<container-compatible-range<bool> R>
        constexpr void assign_range(R&& rg);
        constexpr void assign(size_type n, const bool& t);
        constexpr void assign(initializer_list<bool>);
        constexpr allocator_type get_allocator() const noexcept;
    
        // iterators
        constexpr iterator begin() noexcept;
        constexpr const_iterator begin() const noexcept;
        constexpr iterator end() noexcept;
        constexpr const_iterator end() const noexcept;
        constexpr reverse_iterator rbegin() noexcept;
        constexpr const_reverse_iterator rbegin() const noexcept;
        constexpr reverse_iterator rend() noexcept;
        constexpr const_reverse_iterator rend() const noexcept;
    
        constexpr const_iterator cbegin() const noexcept;
        constexpr const_iterator cend() const noexcept;
        constexpr const_reverse_iterator crbegin() const noexcept;
        constexpr const_reverse_iterator crend() const noexcept;
    
        // capacity
        constexpr bool empty() const noexcept;
        constexpr size_type size() const noexcept;
        constexpr size_type max_size() const noexcept;
        constexpr size_type capacity() const noexcept;
        constexpr void resize(size_type sz, bool c = false);
        constexpr void reserve(size_type n);
        constexpr void shrink_to_fit();
    
        // element access
        constexpr reference operator;
        constexpr const_reference operator const;
        constexpr const_reference at(size_type n) const;
        constexpr reference at(size_type n);
        constexpr reference front();
        constexpr const_reference front() const;
        constexpr reference back();
        constexpr const_reference back() const;
    
        // modifiers
        template<class... Args>
        constexpr reference emplace_back(Args&&... args);
        constexpr void push_back(const bool& x);
        template<container-compatible-range<bool> R>
        constexpr void append_range(R&& rg);
        constexpr void pop_back();
        template<class... Args>
        constexpr iterator emplace(const_iterator position, Args&&... args);
        constexpr iterator insert(const_iterator position, const bool& x);
        constexpr iterator insert(const_iterator position, size_type n, const bool& x);
        template<class InputIter>
        constexpr iterator insert(const_iterator position, InputIter first, InputIter last);
        template<container-compatible-range<bool> R>
        constexpr iterator insert_range(const_iterator position, R&& rg);
        constexpr iterator insert(const_iterator position, initializer_list<bool> il);
    
        constexpr iterator erase(const_iterator position);
        constexpr iterator erase(const_iterator first, const_iterator last);
        constexpr void swap(vector&) noexcept(
          allocator_traits<Allocator>::propagate_on_container_swap::value ||
          allocator_traits<Allocator>::is_always_equal::value);
        static constexpr void swap(reference x, reference y) noexcept;
        constexpr void flip() noexcept; // inverte todos os bits
        constexpr void clear() noexcept;
      };
    }
```

#### Especialização do template de classe [std::formatter](<#/doc/utility/format/formatter>) para [`std::vector`](<#/doc/container/vector_bool>)&lt;bool&gt;::[reference](<#/doc/container/vector_bool/reference>)
```cpp
    namespace std {
      template<class T, class CharT>
        requires /*is-vector-bool-reference*/<T>
      struct formatter<T, CharT>
      {
      private:
        formatter<bool, CharT> /*underlying_*/; // apenas para exposição
    
      public:
        template<class ParseContext>
        constexpr typename ParseContext::iterator parse(ParseContext& ctx);
    
        template<class FormatContext>
        typename FormatContext::iterator format(const T& ref, FormatContext& ctx) const;
      };
    }
```