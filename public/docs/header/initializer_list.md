# Cabeçalho da biblioteca padrão &lt;initializer_list&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [suporte à linguagem](<#/doc/utility>).

### Classes

---
[ initializer_list](<#/doc/utility/initializer_list>)(C++11) | referencia um array temporário criado na [inicialização por lista](<#/doc/language/list_initialization>)
(modelo de classe)

### Funções

[ std::begin(std::initializer_list)](<#/doc/utility/initializer_list/begin2>)(C++11) | sobrecarrega [std::begin](<#/doc/iterator/begin>)
(modelo de função)
[ std::end(std::initializer_list)](<#/doc/utility/initializer_list/end2>)(C++11) | especializa [std::end](<#/doc/iterator/end>)
(modelo de função)

### Sinopse
```cpp
    // todos autônomos
    namespace std {
      template<class E> class initializer_list {
      public:
        using value_type      = E;
        using reference       = const E&;
        using const_reference = const E&;
        using size_type       = size_t;
    
        using iterator        = const E*;
        using const_iterator  = const E*;
    
        constexpr initializer_list() noexcept;
    
        constexpr size_t size() const noexcept;     // número de elementos
        constexpr const E* begin() const noexcept;  // primeiro elemento
        constexpr const E* end() const noexcept;    // um após o último elemento
      };
    
      // acesso por range de initializer list
      template<class E> constexpr const E* begin(initializer_list<E> il) noexcept;
      template<class E> constexpr const E* end(initializer_list<E> il) noexcept;
    }
```