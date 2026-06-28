# std::unexpected

Definido no cabeçalho `[<expected>](<#/doc/header/expected>)`

```c
template< class E >
class unexpected;
```

O template de classe `std::unexpected` representa um valor inesperado armazenado em std::expected. Em particular, std::expected possui construtores com `std::unexpected` como um único argumento, que cria um objeto [`expected`](<#/doc/utility/expected>) que contém um valor inesperado.

Um programa é malformado se instanciar um `unexpected` com um tipo que não seja de objeto, um tipo array, uma especialização de `std::unexpected`, ou um tipo cv-qualified.

### Parâmetros de template

- **E** — o tipo do valor inesperado. O tipo não deve ser um tipo array, um tipo que não seja de objeto, uma especialização de `std::unexpected`, ou um tipo cv-qualified.

### Funções membro

[ (construtor)](<#/doc/utility/expected/unexpected>) | constrói o objeto `unexpected`
(função membro pública)
(destrutor)(declarado implicitamente) | destrói o objeto `unexpected`, juntamente com o valor armazenado
(função membro pública)
operator=(declarado implicitamente) | atribui o valor armazenado
(função membro pública)
[ error](<#/doc/utility/expected/unexpected>) | acessa o valor armazenado
(função membro pública)
[ swap](<#/doc/utility/expected/unexpected>) | troca o valor armazenado
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/utility/expected/unexpected>)(C++23) | compara o valor armazenado
(template de função)
[ swap(std::unexpected)](<#/doc/utility/expected/unexpected>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

## std::unexpected::unexpected

```cpp
constexpr unexpected( const unexpected& ) = default;  // (1)
constexpr unexpected( unexpected&& ) = default;  // (2)
template< class Err = E >
constexpr explicit unexpected( Err&& e );  // (3)
template< class... Args >
constexpr explicit unexpected( std::in_place_t, Args&&... args );  // (4)
template< class U, class... Args >
constexpr explicit unexpected( std::in_place_t,
std::initializer_list<U> il, Args&&... args );  // (5)
```

Constrói um objeto `std::unexpected`.

1,2) Construtor de cópia/movimentação. Copia ou move o valor armazenado, respectivamente.

3) Constrói o valor armazenado, como se por [inicialização direta](<#/doc/language/direct_initialization>) de um valor do tipo `E` a partir de [std::forward](<#/doc/utility/forward>)&lt;Err&gt;(e).

*   Esta sobrecarga participa da resolução de sobrecarga apenas se
    *   [std::is_same_v](<#/doc/types/is_same>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<Err>, unexpected> for falso, e
    *   [std::is_same_v](<#/doc/types/is_same>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<Err>, [std::in_place_t](<#/doc/utility/in_place>)> for falso, e
    *   [std::is_constructible_v](<#/doc/types/is_constructible>)<E, Err> for verdadeiro.

4) Constrói o valor armazenado, como se por [inicialização direta](<#/doc/language/direct_initialization>) de um valor do tipo `E` a partir dos argumentos [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

*   Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, Args...> for verdadeiro.

5) Constrói o valor armazenado, como se por [inicialização direta](<#/doc/language/direct_initialization>) de um valor do tipo `E` a partir dos argumentos il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

*   Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> for verdadeiro.

### Parâmetros

- **e** — valor com o qual inicializar o valor contido
- **args...** — argumentos com os quais inicializar o valor contido
- **il** — lista de inicializadores com a qual inicializar o valor contido

### Exceções

Lança qualquer exceção lançada pelo construtor de `E`.

## std::unexpected::error

constexpr const E& error() const& noexcept;
constexpr E& error() & noexcept;
constexpr const E&& error() const&& noexcept;
constexpr E&& error() && noexcept;

Retorna uma referência ao valor armazenado.

## std::unexpected::swap

constexpr void swap( unexpected& other ) noexcept([std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;E&gt;);

Troca os valores armazenados, como se usando [std::swap](<#/doc/algorithm/swap>); swap(error(), other.error());.

O programa é malformado se [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;E&gt; for falso.

## operator==(std::unexpected)

template< class E2 >
friend constexpr bool operator==( unexpected& x, std::unexpected&lt;E2&gt;& y );

Compara os valores armazenados, como se por return x.error() == y.error().

Se a expressão x.error() == e.error() não for bem-formada, ou se seu resultado não for conversível para bool, o programa é malformado.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando std::unexpected&lt;E&gt; é uma classe associada dos argumentos.

## swap(std::unexpected)

friend constexpr void
swap( unexpected& x, unexpected& y ) noexcept(noexcept(x.swap(y)));

Equivalente a x.swap(y).

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;E&gt; for verdadeiro.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando std::unexpected&lt;E&gt; é uma classe associada dos argumentos.

### Guias de dedução

```cpp
template< class E >
unexpected(E) -> unexpected<E>;  // (desde C++23)
```

O [guia de dedução](<#/doc/language/ctad>) é fornecido para unexpected para permitir a dedução a partir do argumento do construtor.

### Notas

Antes do C++17, o nome [`std::unexpected`](<#/doc/error/unexpected>) denotava a função chamada pelo runtime C++ quando uma especificação de exceção dinâmica era violada.

### Exemplo

Execute este código
```cpp
    #include <expected>
    #include <iostream>
    
    enum class error
    {
        compile_time_error,
        runtime_error
    };
    
    [[nodiscard]] auto unexpected_runtime_error() -> std::expected<int, error>
    {
        return std::unexpected(error::runtime_error);
    }
    
    int main()
    {
        std::expected<double, int> ex = std::unexpected(3);
    
        if (!ex)
            std::cout << "ex contains an error value\n";
    
        if (ex == std::unexpected(3))
            std::cout << "The error value is equal to 3\n";
    
        const auto e = unexpected_runtime_error();
    
        e.and_then( -> std::expected<int, error>
        {
            std::cout << "and_then: " << int(e); // not printed
            return {};
        })
        .or_else( -> std::expected<int, error>
        {
            std::cout << "or_else: " << int(e); // prints this line
            return {};
        });
    }
```

Saída:
```
    ex contains an error value
    The error value is equal to 3
    or_else: 1
```

### Veja também

[ (construtor)](<#/doc/utility/expected/expected>) | constrói o objeto `expected`
(função membro pública)
[ operator==](<#/doc/utility/expected/operator_cmp>)(C++23) | compara objetos `expected`
(template de função)
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.