# std::uncaught_exception, std::uncaught_exceptions

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
bool uncaught_exception() throw();
bool uncaught_exception() noexcept;
(obsoleto em C++17)
(removido em C++20)
int uncaught_exceptions() noexcept;
(constexpr desde C++26)
```

1) Detecta se a thread atual possui um objeto de exceção "vivo", ou seja, uma exceção foi lançada ou relançada e ainda não entrou em uma cláusula catch correspondente, [std::terminate](<#/doc/error/terminate>) ou [std::unexpected](<#/doc/error/unexpected>). Em outras palavras, `std::uncaught_exception` detecta se o [desenrolamento da pilha](<#/doc/language/throw>) está atualmente em progresso.

2) Detecta quantas exceções na thread atual foram lançadas ou relançadas e ainda não entraram em suas cláusulas catch correspondentes.

Às vezes, é seguro lançar uma exceção mesmo enquanto std::uncaught_exception() == true(até C++17) std::uncaught_exceptions() > 0(desde C++17). Por exemplo, se o [desenrolamento da pilha](<#/doc/language/throw>) faz com que um objeto seja destruído, o destrutor para esse objeto pode executar código que lança uma exceção, desde que a exceção seja capturada por algum bloco catch antes de escapar do destrutor.

### Parâmetros

(nenhum)

### Valor de retorno

1) true se o desenrolamento da pilha estiver atualmente em progresso nesta thread, false caso contrário.

2) O número de objetos de exceção não capturados na thread atual.

### Notas

Um exemplo onde `uncaught_exceptions` que retorna int é usado é a biblioteca [boost.log](<https://www.boost.org/doc/libs/release/libs/log/doc/html/index.html>): a expressão BOOST_LOG(logger) << foo(); primeiro cria um objeto guarda e registra o número de exceções não capturadas em seu construtor. A saída é realizada pelo destrutor do objeto guarda, a menos que foo() lance (nesse caso, o número de exceções não capturadas no destrutor é maior do que o observado pelo construtor).

[`std::experimental::scope_fail`](<#/doc/experimental/scope_fail>) e [`std::experimental::scope_success`](<#/doc/experimental/scope_success>) no LFTS v3 dependem da funcionalidade de `uncaught_exceptions`, porque seus destrutores precisam fazer coisas diferentes que dependem se é chamado durante o desenrolamento da pilha.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_uncaught_exceptions`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | `std::uncaught_exceptions`
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

Execute este código
```cpp
    #include <exception>
    #include <iostream>
    #include <stdexcept>
    
    struct Foo
    {
        char id{'?'};
        int count = std::uncaught_exceptions();
    
        ~Foo()
        {
            count == std::uncaught_exceptions()
                ? std::cout << id << ".~Foo() called normally\n"
                : std::cout << id << ".~Foo() called during stack unwinding\n";
        }
    };
    
    int main()
    {
        Foo f{'f'};
    
        try
        {
            Foo g{'g'};
            std::cout << "Exception thrown\n";
            throw std::runtime_error("test exception");
        }
        catch (const std::exception& e)
        {
            std::cout << "Exception caught: " << e.what() << '\n';
        }
    }
```

Saída possível:
```
    Exception thrown
    g.~Foo() called during stack unwinding
    Exception caught: test exception
    f.~Foo() called normally
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 70](<https://cplusplus.github.io/LWG/issue70>) | C++98 | a especificação de exceção de `uncaught_exception()` estava faltando | especificado como `throw()`

### Veja também

[ terminate](<#/doc/error/terminate>) | função chamada quando o tratamento de exceções falha
(função)
[ exception_ptr](<#/doc/error/exception_ptr>)(C++11) | tipo de ponteiro compartilhado para lidar com objetos de exceção
(typedef)
[ current_exception](<#/doc/error/current_exception>)(C++11) | captura a exceção atual em um [std::exception_ptr](<#/doc/error/exception_ptr>)
(função)

### Links externos

1. | [GOTW issue 47: Uncaught Exceptions](<http://www.gotw.ca/gotw/047.htm>)
---|---
2. | [Justificativa para `std::uncaught_exceptions`](<https://wg21.link/n4152>) (N4125)