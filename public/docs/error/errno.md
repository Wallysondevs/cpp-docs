# errno

Definido no header `[<cerrno>](<#/doc/header/cerrno>)`
#define errno /* implementation-defined */

errno é uma macro de pré-processador usada para indicação de erro. Ela se expande para um lvalue modificável do tipo int, que é static (até C++11) e thread-local (desde C++11).

Várias funções da standard library indicam erros escrevendo inteiros positivos em errno. Tipicamente, o valor de errno é definido para um dos códigos de erro, listados em [`<cerrno>`](<#/doc/header/cerrno>) como constantes de macro que começam com a letra `E`, seguida por letras maiúsculas ou dígitos.

O valor de errno é ​0​ na inicialização do programa, e embora as funções da biblioteca possam escrever inteiros positivos em errno, ocorrendo ou não um erro, as funções da biblioteca nunca armazenam ​0​ em errno.

### Exemplo

Execute este código
```
    #include <cerrno>
    #include <clocale>
    #include <cmath>
    #include <cstring>
    #include <iostream>
     
    int main()
    {
        const double not_a_number = std::log(-1.0);
        std::cout << not_a_number << '\n';
     
        if (errno == EDOM)
        {
            std::cout << "log(-1) failed: " << std::strerror(errno) << '\n';
            std::setlocale(LC_MESSAGES, "de_DE.utf8");
            std::cout << "Or, in German, " << std::strerror(errno) << '\n';
        }
    }
```

Saída possível:
```
    nan
    log(-1) failed: Numerical argument out of domain
    Or, in German, Das numerische Argument ist ausserhalb des Definitionsbereiches
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 310](<https://cplusplus.github.io/LWG/issue310>) | C++98 | não estava claro se errno é uma macro ou um identificador com linkage externo | errno deve ser uma macro

### Veja também

[ E2BIG, EACCES, ..., EXDEV](<#/doc/error/errno_macros>) | macros para condições de erro padrão compatíveis com POSIX
(constante de macro)
[ perror](<#/doc/io/c/perror>) | exibe uma string de caracteres correspondente ao erro atual em [stderr](<#/doc/io/c/std_streams>)
(função)
[ strerror](<#/doc/string/byte/strerror>) | retorna uma versão textual de um dado código de erro
(função)
[Documentação C](<#/>) para errno