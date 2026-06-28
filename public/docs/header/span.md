# Cabeçalho da biblioteca padrão &lt;span&gt; (C++20)

Este cabeçalho faz parte da biblioteca [containers](<#/doc/container>).

### Classes

---
[ span](<#/doc/container/span>)(C++20) | uma view não proprietária sobre uma sequência contígua de objetos
(modelo de classe)

### Constantes

[ dynamic_extent](<#/doc/container/span/dynamic_extent>)(C++20) | uma constante do tipo [std::size_t](<#/doc/types/size_t>) significando que o `span` possui extensão dinâmica
(constante)

### Funções

[ as_bytesas_writable_bytes](<#/doc/container/span/as_bytes>)(C++20) | converte um `span` em uma view de seus bytes subjacentes
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
    #include <initializer_list>
     
    // principalmente independente
    namespace std {
      // constantes
      inline constexpr size_t dynamic_extent = numeric_limits<size_t>::max();
     
      template<class T>
      concept /*integral-constant-like*/ = // apenas para exposição
        is_integral_v<decltype(T::value)> &&
        !is_same_v<bool, remove_const_t<decltype(T::value)>> &&
        convertible_to<T, decltype(T::value)> &&
        equality_comparable_with<T, decltype(T::value)> &&
        bool_constant<T() == T::value>::value &&
        bool_constant<static_cast<decltype(T::value)>(T()) == T::value>::value;
     
      template<class T>
      constexpr size_t /*maybe-static-ext*/ = dynamic_extent; // apenas para exposição
      template</*integral-constant-like*/ T>
      constexpr size_t /*maybe-static-ext*/<T> = { T::value };
     
      // modelo de classe span
      template<class ElementType, size_t Extent = dynamic_extent>
      class span; // parcialmente independente
     
      template<class ElementType, size_t Extent>
      constexpr bool ranges::enable_view<span<ElementType, Extent>> = true;
      template<class ElementType, size_t Extent>
      constexpr bool ranges::enable_borrowed_range<span<ElementType, Extent>> = true;
     
      // views da representação de objeto
      template<class ElementType, size_t Extent>
      span<const byte,
           Extent == dynamic_extent ? dynamic_extent : sizeof(ElementType) * Extent>
      as_bytes(span<ElementType, Extent> s) noexcept;
     
      template<class ElementType, size_t Extent>
      span<byte, Extent == dynamic_extent ? dynamic_extent : sizeof(ElementType) * Extent>
      as_writable_bytes(span<ElementType, Extent> s) noexcept;
    }
```

#### Modelo de classe std::span
```cpp
    namespace std {
      template<class ElementType, size_t Extent = dynamic_extent>
      class span
      {
      public:
        // constantes e tipos
        using element_type                = ElementType;
        using value_type                  = remove_cv_t<ElementType>;
        using size_type                   = size_t;
        using difference_type             = ptrdiff_t;
        using pointer                     = element_type*;
        using const_pointer               = const element_type*;
        using reference                   = element_type&;
        using const_reference             = const element_type&;
        using iterator                    = /* implementation-defined */;
        using const_iterator              = std::const_iterator<iterator>;
        using reverse_iterator            = std::reverse_iterator<iterator>;
        using const_reverse_iterator      = std::const_iterator<reverse_iterator>;
        static constexpr size_type extent = Extent;
     
        // construtores, cópia e atribuição
        constexpr span() noexcept;
        template<class It>
        constexpr explicit(extent != dynamic_extent) span(It first, size_type count);
        template<class It, class End>
        constexpr explicit(extent != dynamic_extent) span(It first, End last);
        template<size_t N>
        constexpr span(type_identity_t<element_type> (&arr)[N]) noexcept;
        template<class T, size_t N>
        constexpr span(array<T, N>& arr) noexcept;
        template<class T, size_t N>
        constexpr span(const array<T, N>& arr) noexcept;
        template<class R>
        constexpr explicit(extent != dynamic_extent) span(R&& r);
        constexpr explicit(extent != dynamic_extent)
          span(std::initializer_list<value_type> il);
        constexpr span(const span& other) noexcept = default;
        template<class OtherElementType, size_t OtherExtent>
        constexpr explicit(/* veja a descrição */)
          span(const span<OtherElementType, OtherExtent>& s) noexcept;
     
        constexpr span& operator=(const span& other) noexcept = default;
     
        // sub-views
        template<size_t Count>
        constexpr span<element_type, Count> first() const;
        template<size_t Count>
        constexpr span<element_type, Count> last() const;
        template<size_t Offset, size_t Count = dynamic_extent>
        constexpr span<element_type, /* veja a descrição */> subspan() const;
     
        constexpr span<element_type, dynamic_extent> first(size_type count) const;
        constexpr span<element_type, dynamic_extent> last(size_type count) const;
        constexpr span<element_type, dynamic_extent> subspan(
          size_type offset,
          size_type count = dynamic_extent) const;
     
        // observadores
        constexpr size_type size() const noexcept;
        constexpr size_type size_bytes() const noexcept;
        constexpr bool empty() const noexcept;
     
        // acesso a elementos
        constexpr reference operator const;
        constexpr reference at(size_type idx) const; // excluído (freestanding)
        constexpr reference front() const;
        constexpr reference back() const;
        constexpr pointer data() const noexcept;
     
        // suporte a iterator
        constexpr iterator begin() const noexcept;
        constexpr iterator end() const noexcept;
        constexpr const_iterator cbegin() const noexcept { return begin(); }
        constexpr const_iterator cend() const noexcept { return end(); }
        constexpr reverse_iterator rbegin() const noexcept;
        constexpr reverse_iterator rend() const noexcept;
        constexpr const_reverse_iterator crbegin() const noexcept { return rbegin(); }
        constexpr const_reverse_iterator crend() const noexcept { return rend(); }
     
      private:
        pointer /*data_*/;   // apenas para exposição
        size_type /*size_*/; // apenas para exposição
      };
     
      template<class It, class EndOrSize>
      span(It, EndOrSize)
        -> span<remove_reference_t<iter_reference_t<It>>, /*maybe-static-ext*/<EndOrSize>>;
      template<class T, size_t N>
      span(T (&)[N]) -> span<T, N>;
      template<class T, size_t N>
      span(array<T, N>&) -> span<T, N>;
      template<class T, size_t N>
      span(const array<T, N>&) -> span<const T, N>;
      template<class R>
      span(R&&) -> span<remove_reference_t<ranges::range_reference_t<R>>>;
    }
```