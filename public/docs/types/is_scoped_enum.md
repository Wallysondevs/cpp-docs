# std::is_scoped_enum

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_scoped_enum;
```

`std::is_scoped_enum` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um [tipo de enumeração com escopo](<#/doc/language/enum>). Fornece a constante membro `value` que é igual a true, se `T` for um tipo de enumeração com escopo. Caso contrário, `value` é igual a false.

Se o programa adicionar especializações para `std::is_scoped_enum` ou `std::is_scoped_enum_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo para verificar

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_scoped_enum_v = is_scoped_enum<T>::value;  // (desde C++23)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um tipo de enumeração com escopo, false caso contrário
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

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_is_scoped_enum`](<#/doc/feature_test>) | [`202011L`](<#/>) | (C++23) | `std::is_scoped_enum`

### Possível implementação
```cpp
    template<typename E>
    struct is_scoped_enum : std::bool_constant<requires
    {
        requires std::is_enum_v<E>;
        requires !std::is_convertible_v<E, std::underlying_type_t<E>>;
    }>
    {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    class A {};
    
    enum E {};
    
    enum struct Es { oz };
    
    enum class Ec : int {};
    
    int main()
    {
        static_assert(std::is_scoped_enum_v<A> == false);
        static_assert(std::is_scoped_enum_v<E> == false);
        static_assert(std::is_scoped_enum_v<Es> == true);
        static_assert(std::is_scoped_enum_v<Ec> == true);
        static_assert(std::is_scoped_enum_v<int> == false);
    }
```

### Veja também

[ is_integral](<#/doc/types/is_integral>)(C++11) | verifica se um tipo é um tipo integral
(template de classe)
[ is_arithmetic](<#/doc/types/is_arithmetic>)(C++11) | verifica se um tipo é um tipo aritmético
(template de classe)
[ is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(template de classe)
[ is_enum](<#/doc/types/is_enum>)(C++11) | verifica se um tipo é um tipo de enumeração
(template de classe)