# Cabeçalho da biblioteca experimental &lt;experimental/optional&gt;

Este cabeçalho faz parte do Library Fundamentals TS ([v1](<#/doc/experimental/memory>), [v2](<#/doc/experimental/lib_extensions_2>)).

### Classes

Nome | Descrição
---|---
[ optional](<#/doc/experimental/optional>)(library fundamentals TS) | um wrapper que pode ou não conter um objeto
(modelo de classe)
[ bad_optional_access](<#/doc/experimental/optional/bad_optional_access>)(library fundamentals TS) | exceção indicando acesso verificado a um optional que não contém um valor
(classe)
[ in_place_t](<#/doc/experimental/optional/in_place_t>)(library fundamentals TS) | tipo de tag de desambiguação para construção in-place de tipos optional
(classe)
[ std::hash<std::experimental::optional>](<#/doc/experimental/optional/hash>) | especializa o algoritmo [std::hash](<#/doc/utility/hash>)
(especialização de modelo de classe)
[ nullopt_t](<#/doc/experimental/optional/nullopt_t>)(library fundamentals TS) | indicador de tipo optional com estado não inicializado
(classe)

### Funções

##### Comparação

---
[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/experimental/optional/operator_cmp>) | compara objetos `optional`
(modelo de função)

##### Algoritmos especializados

[ std::swap(std::experimental::optional)](<#/doc/experimental/optional/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)
[ make_optional](<#/doc/experimental/optional/make_optional>) | cria um objeto `optional`
(modelo de função)

##### Suporte a Hash

### Sinopse
```cpp
    namespace std {
      namespace experimental {
      inline namespace fundamentals_v1 {
    
        // 5.4, optional for object types
        template <class T> class optional;
    
        // 5.5, In-place construction
        struct in_place_t{};
        constexpr in_place_t in_place{};
    
        // 5.6, Disengaged state indicator
        struct nullopt_t{see below};
        constexpr nullopt_t nullopt(unspecified);
    
        // 5.7, Class bad_optional_access
        class bad_optional_access;
    
        // 5.8, Relational operators
        template <class T>
          constexpr bool operator==(const optional<T>&, const optional<T>&);
        template <class T>
          constexpr bool operator!=(const optional<T>&, const optional<T>&);
        template <class T>
          constexpr bool operator<(const optional<T>&, const optional<T>&);
        template <class T>
          constexpr bool operator>(const optional<T>&, const optional<T>&);
        template <class T>
          constexpr bool operator<=(const optional<T>&, const optional<T>&);
        template <class T>
          constexpr bool operator>=(const optional<T>&, const optional<T>&);
    
        // 5.9, Comparison with nullopt
        template <class T> constexpr bool operator==(const optional<T>&, nullopt_t) noexcept;
        template <class T> constexpr bool operator==(nullopt_t, const optional<T>&) noexcept;
        template <class T> constexpr bool operator!=(const optional<T>&, nullopt_t) noexcept;
        template <class T> constexpr bool operator!=(nullopt_t, const optional<T>&) noexcept;
        template <class T> constexpr bool operator<(const optional<T>&, nullopt_t) noexcept;
        template <class T> constexpr bool operator<(nullopt_t, const optional<T>&) noexcept;
        template <class T> constexpr bool operator<=(const optional<T>&, nullopt_t) noexcept;
        template <class T> constexpr bool operator<=(nullopt_t, const optional<T>&) noexcept;
        template <class T> constexpr bool operator>(const optional<T>&, nullopt_t) noexcept;
        template <class T> constexpr bool operator>(nullopt_t, const optional<T>&) noexcept;
        template <class T> constexpr bool operator>=(const optional<T>&, nullopt_t) noexcept;
        template <class T> constexpr bool operator>=(nullopt_t, const optional<T>&) noexcept;
    
        // 5.10, Comparison with T
        template <class T> constexpr bool operator==(const optional<T>&, const T&);
        template <class T> constexpr bool operator==(const T&, const optional<T>&);
        template <class T> constexpr bool operator!=(const optional<T>&, const T&);
        template <class T> constexpr bool operator!=(const T&, const optional<T>&);
        template <class T> constexpr bool operator<(const optional<T>&, const T&);
        template <class T> constexpr bool operator<(const T&, const optional<T>&);
        template <class T> constexpr bool operator<=(const optional<T>&, const T&);
        template <class T> constexpr bool operator<=(const T&, const optional<T>&);
        template <class T> constexpr bool operator>(const optional<T>&, const T&);
        template <class T> constexpr bool operator>(const T&, const optional<T>&);
        template <class T> constexpr bool operator>=(const optional<T>&, const T&);
        template <class T> constexpr bool operator>=(const T&, const optional<T>&);
    
        // 5.11, Specialized algorithms
        template <class T> void swap(optional<T>&, optional<T>&) noexcept(see below);
        template <class T> constexpr optional<see below> make_optional(T&&);
    
      } // namespace fundamentals_v1
      } // namespace experimental
    
      // 5.12, Hash support
      template <class T> struct hash;
      template <class T> struct hash<experimental::optional<T>>;
    
    } // namespace std
```