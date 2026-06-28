# std::ignore

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
Definido no cabeçalho `<utility>`
const /*ignore-type*/ ignore;
(até C++14)
constexpr /*ignore-type*/ ignore;
(inline desde C++17)
struct /*ignore-type*/
{
template< class T >
const /*ignore-type*/& operator=( const T& ) const noexcept
{
return *this;
}
};
(até C++14)
(apenas para exposição*)
struct /*ignore-type*/
{
template< class T >
constexpr const /*ignore-type*/& operator=( const T& ) const noexcept
{
return *this;
}
};
(apenas para exposição*)
```

1) Um objeto ao qual qualquer valor pode ser atribuído sem efeito.

2) O tipo de `std::ignore`.

### Notas

Uma expressão void ou um valor de bit-field volátil não pode ser atribuído a `std::ignore`.

`std::ignore` é destinado para uso com [std::tie](<#/doc/utility/tuple/tie>) ao desempacotar uma [std::tuple](<#/doc/utility/tuple>), como um placeholder para os argumentos que não são usados, mas pode ser usado para qualquer atribuição indesejada.

Alguns guias de código recomendam usar `std::ignore` para evitar avisos de valores de retorno não utilizados de funções `[[[nodiscard](<#/doc/language/attributes/nodiscard>)]]`, mesmo que uma atribuição não seja necessária.

Para ignorar valores que não exigem atribuição, pode-se fazer um cast para void. Para variáveis que têm nomes, mas cujo valor não é usado, pode-se fazer um cast para void ou declarar essas variáveis com `[[[maybe_unused](<#/doc/language/attributes/maybe_unused>)]]`.

### Exemplo

1. Demonstra o uso de `std::ignore` juntamente com uma função `[[[nodiscard](<#/doc/language/attributes/nodiscard>)]]`.
2. Desempacota um [std::pair](<#/doc/utility/pair>)<iterator, bool> retornado por [std::set](<#/doc/container/set>)::[`insert`](<#/doc/container/set/insert>)(), mas salva apenas o booleano.

Execute este código
```cpp
    #include <iostream>
    #include <set>
    #include <string>
    #include <tuple>
    
    [[nodiscard]] int dontIgnoreMe()
    {
        return 42;
    }
    
    int main()
    {
        std::ignore = dontIgnoreMe();
    
        std::set<std::string> set_of_str;
        if (bool inserted{false};
            std::tie(std::ignore, inserted) = set_of_str.insert("Test"),
            inserted)
            std::cout << "Value was inserted successfully.\n";
    }
```

Saída:
```
    Value was inserted successfully.
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2773](<https://cplusplus.github.io/LWG/issue2773>) | C++14 | [std::tuple](<#/doc/utility/tuple>) foi tornado constexpr mas `std::ignore` ainda não era | tornado constexpr
[P2968R2](<https://wg21.link/P2968R2>) | C++11 | o comportamento de `std::ignore` fora de [std::tie](<#/doc/utility/tuple/tie>) não foi formalmente especificado | tornado totalmente especificado

### Veja também

[ tie](<#/doc/utility/tuple/tie>)(C++11) | cria uma [tuple](<#/doc/utility/tuple>) de referências lvalue ou desempacota uma tuple em objetos individuais
(modelo de função)