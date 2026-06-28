# assert

Definido no header `[<cassert>](<#/doc/header/cassert>)`

```cpp
Asserção desabilitada
  // (1)
#define assert(condition) ((void)0)
#define assert(...) ((void)0)  // (desde C++26)
Asserção habilitada
  // (2)
#define assert(condition) /* unspecified */
#define assert(...) /* unspecified */  // (desde C++26)
```

A definição da macro `assert` depende de outra macro, NDEBUG, que não é definida pela standard library.

1) Se NDEBUG for definida como um nome de macro no ponto do código-fonte onde `[`&lt;cassert&gt;`](<#/doc/header/cassert>)` ou `[`<assert.h>`](<#/doc/header/cassert>)` é incluída, a asserção é desabilitada: `assert` não faz nada.

2) Caso contrário, a asserção é habilitada: `assert` verifica se seu argumento (que deve ter tipo escalar):

  * Se o argumento for diferente de zero, não há outros efeitos.
  * Caso contrário, `assert` cria um diagnóstico no fluxo de erro padrão e chama `[std::abort()](<#/doc/utility/program/abort>)`.

| (ate C++26)
`assert` insere um teste de diagnóstico em programas e se expande para uma expressão do tipo void. __VA_ARGS__ é avaliado e `[contextualmente convertido para bool](<#/doc/language/implicit_cast>)`:

  * Se a avaliação resultar em true, não há outros efeitos.
  * Caso contrário, `assert` cria um diagnóstico no fluxo de erro padrão e chama `[std::abort()](<#/doc/utility/program/abort>)`.

| (desde C++26)

A informação de diagnóstico tem um formato definido pela implementação, mas sempre inclui as seguintes informações:

  * o texto de condition

| (ate C++26)

  * #__VA_ARGS__

| (desde C++26)

  * o nome do arquivo-fonte (i.e., `[`__FILE__`](<#/doc/preprocessor/replace>)`)
  * o número da linha do código-fonte (i.e., `[`__LINE__`](<#/doc/preprocessor/replace>)`)
  * o nome da função envolvente (i.e., `[`__func__`](<#/doc/language/function>)`)

A expressão assert(E) é garantida como sendo uma `[subexpressão constante](<#/doc/language/constant_expression>)`, se qualquer um dos seguintes for verdadeiro:

  * NDEBUG for definida no ponto onde `assert` é definida ou redefinida pela última vez, ou
  * E, `[contextualmente convertido para bool](<#/doc/language/implicit_cast>)`, for uma subexpressão constante que avalia para true.

| (desde C++11)

### Parâmetros

- **condition** — expressão de tipo escalar

### Notas

Como `assert` é uma `[macro tipo-função](<#/doc/preprocessor/replace>)`, vírgulas em qualquer lugar no argumento que não estejam protegidas por parênteses são interpretadas como separadores de argumento de macro. Tais vírgulas são frequentemente encontradas em listas de argumentos de template e inicialização de lista:
```cpp
    assert(std::is_same_v<int, int>);        // error: assert does not take two arguments
    assert((std::is_same_v<int, int>));      // OK: one argument
    static_assert(std::is_same_v<int, int>); // OK: not a macro
    
    std::complex<double> c;
    assert(c == std::complex<double>{0, 0});   // error
    assert((c == std::complex<double>{0, 0})); // OK
```

| (ate C++26)

Não há uma interface padronizada para adicionar uma mensagem adicional aos erros de `assert`. Uma maneira portátil de incluir uma é usar um `[operador vírgula](<#/doc/language/operator_other>)` desde que não tenha sido `[sobrecarregado](<#/doc/language/operators>)`, ou usar `&&` com um literal de string:
```cpp
    assert(("There are five lights", 2 + 2 == 5));
    assert(2 + 2 == 5 && "There are five lights");
```

A implementação de `assert` no `[Microsoft CRT](<https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/assert-macro-assert-wassert>)` não está em conformidade com C++11 e revisões posteriores, porque sua função subjacente (`_wassert`) não aceita nem __func__ nem um substituto equivalente.

Desde C++20, os valores necessários para a mensagem de diagnóstico também podem ser obtidos de `[`std::source_location::current()`](<#/doc/utility/source_location/current>)`.

Embora a mudança de `assert` em C23/C++26 não seja formalmente um relatório de defeito, o comitê C `[recomenda](<https://www.open-std.org/jtc1/sc22/wg14/www/previous.html>)` que as implementações façam o backport da mudança para modos antigos.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    // uncomment to disable assert()
    // #define NDEBUG
    #include <cassert>
    
    // Use (void) to silence unused warnings.
    #define assertm(exp, msg) assert((void(msg), exp))
    
    int main()
    {
        assert(2 + 2 == 4);
        std::cout << "Checkpoint #1\n";
    
        assert((void("void helps to avoid 'unused value' warning"), 2 * 2 == 4));
        std::cout << "Checkpoint #2\n";
    
        assert((010 + 010 == 16) && "Yet another way to add an assert message");
        std::cout << "Checkpoint #3\n";
    
        assertm((2 + 2) % 3 == 1, "Success");
        std::cout << "Checkpoint #4\n";
    
        assertm(2 + 2 == 5, "Failed"); // assertion fails
        std::cout << "Execution continues past the last assert\n"; // No output
    }
```

Saída possível:
```
    Checkpoint #1
    Checkpoint #2
    Checkpoint #3
    Checkpoint #4
    main.cpp:23: int main(): Assertion `((void)"Failed", 2 + 2 == 5)' failed.
    Aborted
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2234](<https://cplusplus.github.io/LWG/issue2234>) | C++11 | `assert` não podia ser usado em expressão constante | pode ser usado

### Veja também

[`static_assert` declaration](<#/doc/language/static_assert>) (C++11) | realiza verificação de asserção em tempo de compilação
---|---
[ abort](<#/doc/utility/program/abort>) | causa terminação anormal do programa (sem limpeza)
(função)
[documentação C](<#/>) para assert