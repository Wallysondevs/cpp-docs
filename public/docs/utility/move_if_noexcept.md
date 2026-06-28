# std::move_if_noexcept

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T >
/* see below */ move_if_noexcept( T& x ) noexcept;
(constexpr desde C++14)
```

`std::move_if_noexcept` obtém uma rvalue reference para seu argumento se seu construtor de movimento não lançar exceções ou se não houver construtor de cópia (tipo move-only), caso contrário, obtém uma lvalue reference para seu argumento. É tipicamente usado para combinar move semantics com garantia de exceção forte.

O tipo de retorno de `std::move_if_noexcept` é:

  * T&& se [std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>)&lt;T&gt;::value || ![std::is_copy_constructible](<#/doc/types/is_copy_constructible>)&lt;T&gt;::value for verdadeiro.
  * Caso contrário, const T&.

### Parâmetros

- **x** — o objeto a ser movido ou copiado

### Valor de retorno

std::move(x) ou x, dependendo das garantias de exceção.

### Complexidade

Constante.

### Observações

Isso é usado, por exemplo, por [std::vector::resize](<#/doc/container/vector/resize>), que pode ter que alocar novo armazenamento e então mover ou copiar elementos do armazenamento antigo para o novo. Se uma exceção ocorrer durante esta operação, [std::vector::resize](<#/doc/container/vector/resize>) desfaz tudo o que fez até este ponto, o que só é possível se `std::move_if_noexcept` foi usado para decidir se deve usar a construção por movimento ou a construção por cópia (a menos que o construtor de cópia não esteja disponível, caso em que o construtor de movimento é usado de qualquer forma e a garantia de exceção forte pode ser dispensada).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <utility>
    
    struct Bad
    {
        Bad() {}
        Bad(Bad&&) // may throw
        {
            std::cout << "Throwing move constructor called\n";
        }
        Bad(const Bad&) // may throw as well
        {
            std::cout << "Throwing copy constructor called\n";
        }
    };
    
    struct Good
    {
        Good() {}
        Good(Good&&) noexcept // will NOT throw
        {
            std::cout << "Non-throwing move constructor called\n";
        }
        Good(const Good&) noexcept // will NOT throw
        {
            std::cout << "Non-throwing copy constructor called\n";
        }
    };
    
    int main()
    {
        Good g;
        Bad b;
        [[maybe_unused]] Good g2 = std::move_if_noexcept(g);
        [[maybe_unused]] Bad b2 = std::move_if_noexcept(b);
    }
```

Saída:
```
    Non-throwing move constructor called
    Throwing copy constructor called
```

### Veja também

[ forward](<#/doc/utility/forward>)(C++11) | encaminha um argumento de função e usa o argumento de template de tipo para preservar sua categoria de valor
(modelo de função)
[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue
(modelo de função)