# Cabeçalho da biblioteca padrão &lt;typeindex&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [suporte a tipos](<#/doc/types>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para [operador de comparação de três vias](<#/doc/language/operator_comparison>)

### Classes

[ type_index](<#/doc/types/type_index>)(C++11) | wrapper em torno de um objeto `type_info`, que pode ser usado como índice em containers associativos e associativos não ordenados
(class)
[ std::hash<std::type_index>](<#/doc/types/type_index/hash>)(C++11) | suporte a hash para [`std::type_index`](<#/doc/types/type_index>)
(especialização de template de classe)

##### Declarações antecipadas

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```cpp
 hash(C++11)
(template de classe)
```

### Sinopse
```cpp
    #include <compare>
    
    namespace std {
      class type_index;
      template<class T> struct hash;
      template<> struct hash<type_index>;
    }
```

#### Classe [std::type_index](<#/doc/types/type_index>)
```cpp
    namespace std {
      class type_index {
      public:
        type_index(const type_info& rhs) noexcept;
        bool operator==(const type_index& rhs) const noexcept;
        bool operator< (const type_index& rhs) const noexcept;
        bool operator> (const type_index& rhs) const noexcept;
        bool operator<=(const type_index& rhs) const noexcept;
        bool operator>=(const type_index& rhs) const noexcept;
        strong_ordering operator<=>(const type_index& rhs) const noexcept;
        size_t hash_code() const noexcept;
        const char* name() const noexcept;
    
      private:
        const type_info* target; // exposition only
        // Note that the use of a pointer here, rather than a reference,
        // means that the default copy/move constructor and assignment
        // operators will be provided and work as expected.
      };
    }
```