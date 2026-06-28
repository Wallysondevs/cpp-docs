# std::is_reference

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_reference;
```

`std::is_reference` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um tipo de referência (referência lvalue ou referência rvalue), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se o programa adicionar especializações para `std::is_reference` ou `std::is_reference_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo para verificar

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr bool is_reference_v = is_reference<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo de referência, false caso contrário
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

### Possível implementação
```cpp
    template<class T> struct is_reference : std::false_type {};
    template<class T> struct is_reference<T&> : std::true_type {};
    template<class T> struct is_reference<T&&> : std::true_type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    class A {};
    
    int main()
    {
    #   define REF(x) << #x " ?: " << x << '\n'
        std::cout << std::boolalpha
        REF(std::is_reference_v<A>)
        REF(std::is_reference_v<A&>)
        REF(std::is_reference_v<A&&>)
        REF(std::is_reference_v<long>)
        REF(std::is_reference_v<long&>)
        REF(std::is_reference_v<long&&>)
        REF(std::is_reference_v<double*>)
        REF(std::is_reference_v<double*&>)
        REF(std::is_reference_v<double*&&>);
    #   undef REF
    }
```

Saída:
```
    std::is_reference_v<A> ?: false
    std::is_reference_v<A&> ?: true
    std::is_reference_v<A&&> ?: true
    std::is_reference_v<long> ?: false
    std::is_reference_v<long&> ?: true
    std::is_reference_v<long&&> ?: true
    std::is_reference_v<double*> ?: false
    std::is_reference_v<double*&> ?: true
    std::is_reference_v<double*&&> ?: true
```

### Veja também

[ is_lvalue_reference](<#/doc/types/is_lvalue_reference>)(C++11) | verifica se um tipo é uma _referência lvalue_
(modelo de classe)
[ is_rvalue_reference](<#/doc/types/is_rvalue_reference>)(C++11) | verifica se um tipo é uma _referência rvalue_
(modelo de classe)