# std::is_layout_compatible

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T, class U >
struct is_layout_compatible;
```

Se `T` e `U` são tipos [_layout-compatible_](<#/doc/language/data_members>), fornece a constante membro `value` igual a `true`. Caso contrário, `value` é `false`.

Todo tipo é layout-compatible com suas versões cv-qualificadas, mesmo que não seja um tipo de objeto.

Se `T` ou `U` não for um tipo completo, `void` (possivelmente cv-qualificado), ou um array de limite desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação pudesse produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_layout_compatible` ou `std::is_layout_compatible_v`, o comportamento é indefinido.

### Template de variável auxiliar

```cpp
template< class T, class U >
constexpr bool is_layout_compatible_v = is_layout_compatible<T, U>::value;  // (desde C++20)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` e `U` são layout-compatible, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Um tipo inteiro com sinal e seu equivalente sem sinal não são layout-compatible. `char` não é layout-compatible nem com `signed char` nem com `unsigned char`.

[Tipos semelhantes](<#/doc/language/reinterpret_cast>) não são layout-compatible se não forem o mesmo tipo após ignorar a qualificação cv de nível superior.

Um tipo de enumeração e seu tipo subjacente não são layout-compatible.

Tipos array de elementos layout-compatible, mas diferentes (ignorando a qualificação cv), não são layout-compatible, mesmo que tenham o mesmo comprimento.

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_is_layout_compatible`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | `std::is_layout_compatible`

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <type_traits>
    
    struct Foo
    {
        int x;
        char y;
    };
    
    struct FooNua
    {
        int x;
        [[no_unique_address]] char y;
    };
    
    class Bar
    {
        const int u = 42;
        volatile char v = '*';
    };
    
    enum E0 : int {};
    enum class E1 : int {};
    
    static_assert
    (
        std::is_layout_compatible_v<const void, volatile void> == true  and
        std::is_layout_compatible_v<Foo, Bar>                  == true  and
        std::is_layout_compatible_v<Foo[2], Bar[2]>            == false and
        std::is_layout_compatible_v<int, E0>                   == false and
        std::is_layout_compatible_v<E0, E1>                    == true  and
        std::is_layout_compatible_v<long, unsigned long>       == false and
        std::is_layout_compatible_v<char*, const char*>        == false and
        std::is_layout_compatible_v<char*, char* const>        == true  and
        std::is_layout_compatible_v<Foo, FooNua>               == false // Nota [1]
    );
    
    // [1] MSVC falha erroneamente nesta asserção
    
    int main() {}
```

### Veja também

[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo [standard-layout](<#/doc/language/data_members>)
(template de classe)