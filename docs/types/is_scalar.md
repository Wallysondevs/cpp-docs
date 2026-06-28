# std::is_scalar

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_scalar;
```

`std::is_scalar` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um [tipo escalar](<#/doc/named_req/ScalarType>), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se o programa adicionar especializações para `std::is_scalar` ou `std::is_scalar_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_scalar_v = is_scalar<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo escalar, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Cada local de memória individual no modelo de memória C++, incluindo os locais de memória ocultos usados por recursos da linguagem (por exemplo, ponteiro de tabela virtual), tem tipo escalar (ou é uma sequência de campos de bits adjacentes de comprimento não nulo). O sequenciamento de efeitos colaterais na avaliação de expressões, a sincronização entre threads e a ordenação de dependências são todos definidos em termos de objetos escalares individuais.

### Possível implementação
```cpp
    template<class T>
    struct is_scalar : std::integral_constant<bool, std::is_arithmetic<T>::value
                                                 || std::is_enum<T>::value
                                                 || std::is_pointer<T>::value
                                                 || std::is_member_pointer<T>::value
                                                 || std::is_null_pointer<T>::value>
    {};
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    #include <typeinfo>
    #include <utility>
    
    template<typename Head, typename... Tail>
    void are_scalars(Head&& head, Tail&&... tail)
    {
        using T = std::decay_t<decltype(head)>;
    
        std::cout << typeid(T).name() << " is "
                  << (std::is_scalar_v<T> ? "" : "not ")
                  << "a scalar\n";
    
        if constexpr (sizeof... (Tail))
        {
            are_scalars(std::forward<decltype(tail)>(tail)...);
        }
    }
    
    int main()
    {
        struct S { int m; } s;
        int S::* mp = &S::m;
        enum class E { e };
    
        are_scalars(42, 3.14, E::e, "str", mp, nullptr, s);
    }
```

Saída possível:
```
    int is a scalar
    double is a scalar
    main::E is a scalar
    char const* is a scalar
    int main::S::* is a scalar
    nullptr is a scalar
    main::S is not a scalar
```

### Veja também

[ is_arithmetic](<#/doc/types/is_arithmetic>)(C++11) | verifica se um tipo é um tipo aritmético
(template de classe)
[ is_enum](<#/doc/types/is_enum>)(C++11) | verifica se um tipo é um tipo de enumeração
(template de classe)
[ is_pointer](<#/doc/types/is_pointer>)(C++11) | verifica se um tipo é um tipo ponteiro
(template de classe)
[ is_member_pointer](<#/doc/types/is_member_pointer>)(C++11) | verifica se um tipo é um ponteiro para uma função membro não estática ou objeto
(template de classe)