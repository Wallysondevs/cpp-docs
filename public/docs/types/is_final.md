# std::is_final

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)` | | (desde C++14)

```c
template< class T >
struct is_final;
```

`std::is_final` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é uma classe [final](<#/doc/language/final>), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se `T` é um tipo de classe incompleto, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_final` ou `std::is_final_v` (desde C++17), o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr bool is_final_v = is_final<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo de classe final, false caso contrário
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

`std::is_final` é introduzido pela resolução do [LWG issue 2112](<https://cplusplus.github.io/LWG/issue2112>).

Uma [union](<#/doc/language/union>) pode ser declarada `final` (e `std::is_final` irá detectar isso), mesmo que unions não possam ser usadas como bases em nenhum caso.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_is_final`](<#/doc/feature_test>) | [`201402L`](<#/>) | (C++14) | `std::is_final`

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    class A {};
    static_assert(std::is_final_v<A> == false);
    
    class B final {};
    static_assert(std::is_final_v<B> == true);
    
    union U final
    {
        int x;
        double d;
    };
    static_assert(std::is_final_v<U> == true);
    
    int main()
    {
    }
```

### Veja também

[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-union
(modelo de classe)
[ is_polymorphic](<#/doc/types/is_polymorphic>)(C++11) | verifica se um tipo é um tipo de classe polimórfica
(modelo de classe)