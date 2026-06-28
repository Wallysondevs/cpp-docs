# std::is_corresponding_member

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class S1, class S2, class M1, class M2 >
constexpr bool is_corresponding_member( M1 S1::* mp, M2 S2::* mq ) noexcept;
```

Determina se `mp` e `mq` se referem a membros correspondentes na [sequência inicial comum](<#/doc/language/data_members>) de `S1` e `S2`. O programa é malformado se `S1` ou `S2` for um [tipo incompleto](<#/doc/language/type-id>).

Se `S1` ou `S2` não for um [StandardLayoutType](<#/doc/named_req/StandardLayoutType>), ou `M1` ou `M2` não for um tipo de objeto, ou `mp` ou `mq` for igual a `nullptr`, o resultado é sempre `false`.

### Parâmetros

- **mp, mq** — ponteiros para membro a serem detectados

### Valor de retorno

`true` se `mp` e `mq` se referem a membros correspondentes na sequência inicial comum de `S1` e `S2`, caso contrário `false`.

### Notas

O tipo de uma expressão de ponteiro para membro `&S::m` nem sempre é `M S::*`, onde `m` é do tipo `M`, porque `m` pode ser um membro herdado de uma classe base de `S`. Os argumentos de template podem ser especificados para evitar resultados potencialmente surpreendentes.

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct Foo
    {
        int x;
        double d;
    };
    
    struct Bar
    {
        int y;
        double z;
    };
    
    struct Baz : Foo, Bar {}; // not standard-layout
    
    static_assert(
        std::is_same_v<decltype(&Baz::x), int Foo::*> == true &&
        std::is_same_v<decltype(&Baz::y), int Bar::*> == true &&
        std::is_corresponding_member(&Foo::x, &Bar::y) == true &&
        std::is_corresponding_member(&Foo::d, &Bar::z) == true &&
        std::is_corresponding_member(&Baz::x, &Baz::y) == true &&
        std::is_corresponding_member<Baz, Baz, int, int>(&Baz::x, &Baz::y) == false
    );
    
    int main() {}
```

### Veja também

[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo [standard-layout](<#/doc/language/data_members>)
(class template)
[ is_layout_compatible](<#/doc/types/is_layout_compatible>)(C++20) | verifica se dois tipos são [_layout-compatible_](<#/doc/language/data_members>)
(class template)
[ is_member_object_pointer](<#/doc/types/is_member_object_pointer>)(C++11) | verifica se um tipo é um ponteiro para membro objeto não estático
(class template)