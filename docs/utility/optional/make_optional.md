# std::make_optional

Definido no cabeçalho `[<optional>](<#/doc/header/optional>)`

```c
template< class T >
constexpr std::optional<std::decay_t<T>> make_optional( T&& value );
template< class T, class... Args >
constexpr std::optional<T> make_optional( Args&&... args );
template< class T, class U, class... Args >
constexpr std::optional<T> make_optional( std::initializer_list<U> il,
Args&&... args );
```

1) Cria um objeto optional a partir de value. Efetivamente chama [std::optional](<#/doc/utility/optional>)<[std::decay_t](<#/doc/types/decay>)&lt;T&gt;>([std::forward](<#/doc/utility/forward>)&lt;T&gt;(value)).

2) Cria um objeto optional construído no local a partir de args.... Equivalente a return [std::optional](<#/doc/utility/optional>)&lt;T&gt;([std::in_place](<#/doc/utility/in_place>), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...);.
Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, Args...> for true.

3) Cria um objeto optional construído no local a partir de il e args.... Equivalente a return [std::optional](<#/doc/utility/optional>)&lt;T&gt;([std::in_place](<#/doc/utility/in_place>), il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...);.
Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> for true.

### Parâmetros

- **value** — o valor para construir o objeto optional com
- **il, args** — argumentos a serem passados para o construtor de `T`

### Valor de retorno

O objeto optional construído.

### Exceções

Lança qualquer exceção lançada pelo construtor de `T`.

### Notas

`T` não precisa ser movível para as sobrecargas ([2,3](<#/doc/utility/optional/make_optional>)) devido à elisão de cópia garantida.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <optional>
    #include <string>
    #include <vector>
    
    int main()
    {
        auto op1 = std::make_optional<std::vector<char>>({'a','b','c'});
        std::cout << "op1: ";
        for (char c : op1.value())
            std::cout << c << ',';
        auto op2 = std::make_optional<std::vector<int>>(5, 2);
        std::cout << "\nop2: ";
        for (int i : *op2)
            std::cout << i << ',';
        std::string str{"hello world"};
        auto op3 = std::make_optional<std::string>(std::move(str));
        std::cout << "\nop3: " << std::quoted(op3.value_or("empty value")) << '\n';
        std::cout << "str: " << std::quoted(str) << '\n';
    }
```

Saída possível:
```
    op1: a,b,c,
    op2: 2,2,2,2,2,
    op3: "hello world"
    str: ""
```

### Veja também

[ (construtor)](<#/doc/utility/optional/optional>) | constrói o objeto `optional`
(função membro pública)