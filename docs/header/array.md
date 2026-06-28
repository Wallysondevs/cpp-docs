# Cabeçalho da biblioteca padrão &lt;array&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [containers](<#/doc/container>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para [operador de comparação de três vias](<#/doc/language/operator_comparison>)
---|---
[ <initializer_list>](<#/doc/header/initializer_list>)(C++11) | Modelo de classe [std::initializer_list](<#/doc/utility/initializer_list>)

### Classes

[ array](<#/doc/container/array>)(C++11) | array contíguo in-place de tamanho fixo
(modelo de classe)
[ tuple_size](<#/doc/utility/tuple_size>)(C++11) | obtém o número de elementos de um tipo similar a tupla
(modelo de classe)
[ tuple_element](<#/doc/utility/tuple_element>)(C++11) | obtém os tipos dos elementos de um tipo similar a tupla
(modelo de classe)
[ std::tuple_size<std::array>](<#/doc/container/array/tuple_size>)(C++11) | obtém o tamanho de um `array`
(especialização de modelo de classe)
[ std::tuple_element<std::array>](<#/doc/container/array/tuple_element>)(C++11) | obtém o tipo dos elementos de `array`
(especialização de modelo de classe)

### Funções

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/array/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `array`s
(modelo de função)
[ std::swap(std::array)](<#/doc/container/array/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ to_array](<#/doc/container/array/to_array>)(C++20) | cria um objeto `std::array` a partir de um array embutido
(modelo de função)
[ get(std::array)](<#/doc/container/array/get>)(C++11) | acessa um elemento de um `array`
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
    // mostly freestanding
    #include <compare>
    #include <initializer_list>
    
    namespace std {
      // class template array
      template<class T, size_t N>
      struct array; // partially freestanding
    
      template<class T, size_t N>
      constexpr bool operator==(const array<T, N>& x, const array<T, N>& y);
      template<class T, size_t N>
      constexpr /*synth-three-way-result*/<T> operator<=>(const array<T, N>& x,
                                                          const array<T, N>& y);
    
      // specialized algorithms
      template<class T, size_t N>
      constexpr void swap(array<T, N>& x, array<T, N>& y) noexcept(noexcept(x.swap(y)));
    
      // array creation functions
      template<class T, size_t N>
      constexpr array<remove_cv_t<T>, N> to_array(T (&a)[N]);
      template<class T, size_t N>
      constexpr array<remove_cv_t<T>, N> to_array(T (&&a)[N]);
    
      // tuple interface
      template<class T>
      struct tuple_size;
      template<size_t I, class T>
      struct tuple_element;
      template<class T, size_t N>
      struct tuple_size<array<T, N>>;
      template<size_t I, class T, size_t N>
      struct tuple_element<I, array<T, N>>;
      template<size_t I, class T, size_t N>
      constexpr T& get(array<T, N>&) noexcept;
      template<size_t I, class T, size_t N>
      constexpr T&& get(array<T, N>&&) noexcept;
      template<size_t I, class T, size_t N>
      constexpr const T& get(const array<T, N>&) noexcept;
      template<size_t I, class T, size_t N>
      constexpr const T&& get(const array<T, N>&&) noexcept;
    }
```

#### Modelo de classe [std::array](<#/doc/container/array>)
```cpp
    namespace std {
      template<class T, size_t N>
      struct array
      {
        // types
        using value_type             = T;
        using pointer                = T*;
        using const_pointer          = const T*;
        using reference              = T&;
        using const_reference        = const T&;
        using size_type              = size_t;
        using difference_type        = ptrdiff_t;
        using iterator               = /* implementation-defined */;
        using const_iterator         = /* implementation-defined */;
        using reverse_iterator       = std::reverse_iterator<iterator>;
        using const_reverse_iterator = std::reverse_iterator<const_iterator>;
    
        // no explicit construct/copy/destroy for aggregate type
    
        constexpr void fill(const T& u);
        constexpr void swap(array&) noexcept(is_nothrow_swappable_v<T>);
    
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
    
        // element access
        constexpr reference operator;
        constexpr const_reference operator const;
        constexpr reference at(size_type n);             // freestanding-deleted
        constexpr const_reference at(size_type n) const; // freestanding-deleted
        constexpr reference front();
        constexpr const_reference front() const;
        constexpr reference back();
        constexpr const_reference back() const;
    
        constexpr T* data() noexcept;
        constexpr const T* data() const noexcept;
      };
    
      template<class T, class... U>
      array(T, U...) -> array<T, 1 + sizeof...(U)>;
    }
```