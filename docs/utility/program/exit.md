# std::exit

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`

```cpp
void exit( int exit_code );
[[noreturn]] void exit( int exit_code );  // (desde C++11)
```

Causa a terminação normal do programa.

Várias etapas de limpeza são realizadas:

1) Objetos com duração de armazenamento estática são destruídos e funções registradas pela chamada de [std::atexit](<#/doc/utility/program/atexit>) são chamadas: a) Objetos não-locais com duração de armazenamento estática são destruídos na ordem inversa da conclusão de seus construtores. b) Funções registradas com [std::atexit](<#/doc/utility/program/atexit>) são chamadas na ordem inversa de seu registro, exceto que uma função é chamada após quaisquer funções previamente registradas que já haviam sido chamadas no momento em que foi registrada. c) Para cada função f registrada com [std::atexit](<#/doc/utility/program/atexit>) e cada objeto não-local obj com duração de armazenamento estática,

  * se f for registrada antes da inicialização de obj, f só será chamada após a destruição de obj;
  * se f for registrada após a inicialização de obj, f só será chamada antes da destruição de obj.

d) Para cada objeto local obj com duração de armazenamento estática, obj é destruído como se uma função chamando o destrutor de obj fosse registrada com [std::atexit](<#/doc/utility/program/atexit>) na conclusão do construtor de obj. | (ate C++11)
---|---
1) Os destrutores de objetos com [duração de armazenamento](<#/doc/language/storage_duration>) thread-local que estão associados ao thread atual, os destrutores de objetos com duração de armazenamento estática e as funções registradas com [std::atexit](<#/doc/utility/program/atexit>) são executados concorrentemente, mantendo as seguintes garantias: a) O último destrutor para objetos thread-local é [sequenced-before](<#/doc/language/eval_order>) o primeiro destrutor para um objeto estático. b) Se a conclusão do construtor ou [inicialização dinâmica](<#/doc/language/initialization>) para o objeto thread-local ou estático A foi sequenced-before o objeto thread-local ou estático B, a conclusão da destruição de B é sequenced-before o início da destruição de A. c) Se a conclusão da inicialização de um objeto estático A foi sequenced-before a chamada para [std::atexit](<#/doc/utility/program/atexit>) para alguma função F, a chamada para F durante a terminação é sequenced-before o início da destruição de A. d) Se a chamada para [std::atexit](<#/doc/utility/program/atexit>) para alguma função F foi sequenced-before a conclusão da inicialização de um objeto estático A, o início da destruição de A é sequenced-before a chamada para F durante a terminação. e) Se uma chamada para [std::atexit](<#/doc/utility/program/atexit>) para alguma função F1 foi sequenced-before a chamada para [std::atexit](<#/doc/utility/program/atexit>) para alguma função F2, então a chamada para F2 durante a terminação é sequenced-before a chamada para F1. | (desde C++11)

  * No que precede,

  * Se qualquer função registrada com `atexit` ou qualquer destrutor de objeto estático/thread-local lançar uma exceção, [std::terminate](<#/doc/error/terminate>) é chamado.
  * Se o compilador optou por elevar a inicialização dinâmica de um objeto para a fase de inicialização estática da [inicialização não-local](<#/doc/language/initialization>), o sequenciamento da destruição honra sua inicialização dinâmica potencial.
  * Se um objeto estático local de função (com escopo de bloco) foi destruído e então essa função é chamada do destrutor de outro objeto estático e o fluxo de controle passa pela definição desse objeto (ou se ele é usado indiretamente, via ponteiro ou referência), o comportamento é indefinido.
  * Se um objeto estático local de função (com escopo de bloco) foi inicializado durante a construção de um subobjeto de uma classe ou array, ele só é destruído depois que todos os subobjetos dessa classe ou todos os elementos desse array foram destruídos.

2) Todos os streams C são descarregados e fechados.

3) Arquivos criados por [std::tmpfile](<#/doc/io/c/tmpfile>) são removidos.

4) O controle é retornado ao ambiente hospedeiro. Se `exit_code` for 0 ou [EXIT_SUCCESS](<#/doc/utility/program/EXIT_status>), um status definido pela implementação indicando terminação bem-sucedida é retornado. Se `exit_code` for [EXIT_FAILURE](<#/doc/utility/program/EXIT_status>), um status definido pela implementação indicando terminação mal-sucedida é retornado. Em outros casos, um valor de status definido pela implementação é retornado.

A pilha não é desenrolada: destrutores de variáveis com [duração de armazenamento](<#/doc/language/storage_duration>) automática não são chamados.

### Relação com a função main

Retornar da [função main](<#/doc/language/main_function>), seja por uma instrução `return` ou por atingir o final da função, realiza a terminação normal da função (chama os destrutores das variáveis com [durações de armazenamento](<#/doc/language/storage_duration>) automáticas) e então executa `std::exit`, passando o argumento da instrução `return` (ou ​0​ se um return implícito foi usado) como `exit_code`.

### Parâmetros

- **exit_code** — status de saída do programa

### Valor de retorno

(nenhum)

### Exemplo

Run this code
```cpp
    #include <cstdlib>
    #include <iostream>
    
    struct Static
    {
        ~Static() 
        {
            std::cout << "Static destructor\n";
        }
    };
    
    struct Local
    {
        ~Local() 
        {
            std::cout << "Local destructor\n";
        }
    };
    
    Static static_variable; // O destrutor deste objeto *será* chamado
    
    void atexit_handler()
    {
        std::cout << "atexit handler\n";
    }
    
    int main()
    {
        Local local_variable; // O destrutor deste objeto *não* será chamado
        const int result = std::atexit(atexit_handler); // O handler será chamado
    
        if (result != 0)
        {
            std::cerr << "falha no registro do atexit\n";
            return EXIT_FAILURE;
        }
    
        std::cout << "teste\n";
        std::exit(EXIT_FAILURE);
    
        std::cout << "esta linha *não* será executada\n";
    }
```

Output:
```
    test
    atexit handler
    Static destructor
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3](<https://cplusplus.github.io/LWG/issue3>) | C++98 | durante a limpeza, o comportamento era incerto quando (1) uma função é registrada com [std::atexit](<#/doc/utility/program/atexit>) ou (2) um objeto estático local é inicializado | esclarecido

### Veja também

[ abort](<#/doc/utility/program/abort>) | causa a terminação anormal do programa (sem limpeza)
(função)
[ atexit](<#/doc/utility/program/atexit>) | registra uma função a ser chamada na invocação de **std::exit()**
(função)
[ quick_exit](<#/doc/utility/program/quick_exit>)(C++11) | causa a terminação rápida do programa sem limpeza completa
(função)
[ at_quick_exit](<#/doc/utility/program/at_quick_exit>)(C++11) | registra uma função a ser chamada na invocação de [std::quick_exit](<#/doc/utility/program/quick_exit>)
(função)
[documentação C](<#/>) para exit