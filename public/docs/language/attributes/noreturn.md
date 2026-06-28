# Atributo C++: noreturn (desde C++11)

Indica que a função não retorna.

### Sintaxe

---
`[[noreturn]]`

### Explicação

Indica que a função não retornará o fluxo de controle para a função chamadora após sua conclusão (por exemplo, funções que encerram a aplicação, lançam exceções, entram em loop indefinidamente, etc.). Este atributo se aplica apenas ao nome da função que está sendo declarada em declarações de função.

Se uma função previamente declarada com [[noreturn]] for invocada e essa invocação eventualmente retornar, o comportamento é [indefinido em tempo de execução](<#/doc/language/ub>).

A primeira declaração da função deve especificar este atributo se qualquer declaração o especificar. Se uma função é declarada com [[noreturn]] em uma unidade de tradução, e a mesma função é declarada sem [[noreturn]] em outra unidade de tradução, o programa é malformado (ill-formed); nenhum diagnóstico é exigido.

### Exemplo

Execute este código
```
    [[noreturn]] void f()
    {
        throw "error";
        // OK
    }
    
    void q [[noreturn]] (int i)
    {
        // comportamento é indefinido se chamado com um argumento <= 0
        if (i > 0)
            throw "positive";
    }
    
    // void h() [[noreturn]]; // erro: atributo aplicado ao tipo de função de h, não a h em si
    
    int main()
    {
        try { f(); } catch(...) {}
        try { q(42); } catch(...) {}
    }
```

### Biblioteca padrão

As seguintes funções padrão são declaradas com o atributo `noreturn`:

##### Funções de término

---
[ _Exit](<#/doc/utility/program/_Exit>)(C++11) | causa o término normal do programa sem limpeza
(função)
[ abort](<#/doc/utility/program/abort>) | causa o término anormal do programa (sem limpeza)
(função)
[ exit](<#/doc/utility/program/exit>) | causa o término normal do programa com limpeza
(função)
[ quick_exit](<#/doc/utility/program/quick_exit>)(C++11) | causa o término rápido do programa sem limpeza completa
(função)
[ terminate](<#/doc/error/terminate>) | função chamada quando o tratamento de exceções falha
(função)
[ unexpected](<#/doc/error/unexpected>)(obsoleto em C++11)(removido em C++17) | função chamada quando a especificação de exceção dinâmica é violada
(função)

##### Dicas para o compilador

[ unreachable](<#/doc/utility/unreachable>)(C++23) | marca um ponto de execução inalcançável
(função)

##### Funções que sempre lançam exceções

[ rethrow_exception](<#/doc/error/rethrow_exception>)(C++11) | lança a exceção de um [std::exception_ptr](<#/doc/error/exception_ptr>)
(função)
[ rethrow_nested](<#/doc/error/nested_exception/rethrow_nested>) | lança a exceção armazenada
(função membro pública de `std::nested_exception`)
[ throw_with_nested](<#/doc/error/throw_with_nested>)(C++11) | lança seu argumento com [std::nested_exception](<#/doc/error/nested_exception>) misturado
(modelo de função)

##### Saltos não locais (desde C++17)

[ longjmp](<#/doc/utility/program/longjmp>) | salta para o local especificado
(função)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 2924](<https://cplusplus.github.io/CWG/issues/2924.html>) | C++11 | retornar de uma função [[noreturn]]
resultaria em comportamento indefinido | resulta em comportamento
indefinido em tempo de execução

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

  * 9.12.10 Atributo Noreturn [dcl.attr.noreturn]

* Padrão C++20 (ISO/IEC 14882:2020):

  * 9.12.9 Atributo Noreturn [dcl.attr.noreturn]

* Padrão C++17 (ISO/IEC 14882:2017):

  * 10.6.8 Atributo Noreturn [dcl.attr.noreturn]

* Padrão C++14 (ISO/IEC 14882:2014):

  * 7.6.3 Atributo Noreturn [dcl.attr.noreturn]

* Padrão C++11 (ISO/IEC 14882:2011):

  * 7.6.3 Atributo Noreturn [dcl.attr.noreturn]

### Veja também

[Documentação C](<#/>) para _Noreturn
---
[Documentação C](<#/>) para `[[noreturn]]`