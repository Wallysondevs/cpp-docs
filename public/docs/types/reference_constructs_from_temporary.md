Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T, class U >
struct reference_constructs_from_temporary;
```

Seja `V` [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;U&gt; se `U` for um tipo escalar ou _cv_ `void`, ou `U` caso contrário. Se `T` for um tipo de referência, e dada uma expressão hipotética `e` tal que `decltype(e)` seja `V`, a definição de variável `T ref(e);` é bem-formada e [vincula um objeto temporário](<#/doc/language/reference_initialization>) a `ref`, então fornece a constante membro `value` igual a `true`. Caso contrário, `value` é `false`.

Se `T` for um tipo de referência lvalue para um tipo de objeto qualificado como `const` mas não `volatile` ou um tipo de referência rvalue, ambos [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; e [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt; devem ser [tipos completos](<#/doc/language/type-id>), _cv_ `void`, ou [arrays de limite desconhecido](<#/doc/language/array>); caso contrário, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação pudesse produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para `std::reference_constructs_from_temporary` ou `std::reference_constructs_from_temporary_v`, o comportamento é indefinido.

### template de variável auxiliar

```cpp
template< class T, class U >
inline constexpr bool reference_constructs_from_temporary_v =
std::reference_constructs_from_temporary<T, U>::value;  // (desde C++23)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` for um tipo de referência, um valor `U` puder ser vinculado a `T` em inicialização direta, e um objeto temporário seria vinculado à referência, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | `bool`
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

`std::reference_constructs_from_temporary` pode ser usado para rejeitar alguns casos que sempre produzem referências pendentes (dangling references).

Também é possível usar uma lista de inicializadores de membro para rejeitar a vinculação de um objeto temporário a uma referência se o compilador tiver implementado [CWG1696](<https://cplusplus.github.io/CWG/issues/1696.html>).

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    static_assert(std::reference_constructs_from_temporary_v<int&&, int> == true);
    static_assert(std::reference_constructs_from_temporary_v<const int&, int> == true);
    static_assert(std::reference_constructs_from_temporary_v<int&&, int&&> == false);
    static_assert(std::reference_constructs_from_temporary_v<const int&, int&&> == false);
    static_assert(std::reference_constructs_from_temporary_v<int&&, long&&> == true);
    static_assert(std::reference_constructs_from_temporary_v<int&&, long> == true);
    
    int main() {}
```

### Veja também

[ is_constructibleis_trivially_constructibleis_nothrow_constructible](<#/doc/types/is_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor para argumentos específicos
(class template)
[ (constructor)](<#/doc/utility/tuple/tuple>) | constrói uma nova `tuple`
(função membro pública de `std::tuple<Types...>`)
[ (constructor)](<#/doc/utility/pair/pair>) | constrói um novo `pair`
(função membro pública de `std::pair<T1,T2>`)
[ make_from_tuple](<#/doc/utility/make_from_tuple>)(C++17) | constrói um objeto com uma `tuple` de argumentos
(function template)