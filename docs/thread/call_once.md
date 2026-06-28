# std::call_once

Definido no header `[<mutex>](<#/doc/header/mutex>)`

```cpp
template< class Callable, class... Args >
void call_once( std::once_flag& flag, Callable&& f, Args&&... args );  // (desde C++11)
```

Executa o objeto [Callable](<#/doc/named_req/Callable>) f exatamente uma vez, mesmo que chamado concorrentemente por várias threads.

Em detalhe:

*   Se, no momento em que `std::call_once` é chamado, flag indicar que f já foi chamado, `std::call_once` retorna imediatamente (tal chamada a `std::call_once` é conhecida como _passiva_).

*   Caso contrário, `std::call_once` chama [`_INVOKE_`](<#/doc/utility/functional>)([std::forward](<#/doc/utility/forward>)&lt;Callable&gt;(f), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...). Diferente do construtor de [std::thread](<#/doc/thread/thread>) ou [std::async](<#/doc/thread/async>), os argumentos não são movidos ou copiados porque não precisam ser transferidos para outra thread de execução (tal chamada a `std::call_once` é conhecida como _ativa_).

*   Se essa invocação lançar uma exceção, ela é propagada para o chamador de `std::call_once`, e flag não é alterada para que outra chamada seja tentada (tal chamada a `std::call_once` é conhecida como _excepcional_ ).
*   Se essa invocação retornar normalmente (tal chamada a `std::call_once` é conhecida como _retornante_), flag é alterada, e todas as outras chamadas a `std::call_once` com a mesma flag têm garantia de serem _passivas_.

Todas as chamadas _ativas_ na mesma flag formam uma única ordem total consistindo de zero ou mais chamadas _excepcionais_, seguidas por uma chamada _retornante_. O fim de cada chamada _ativa_ sincroniza-se com a próxima chamada _ativa_ nessa ordem.

O retorno da chamada _retornante_ sincroniza-se com os retornos de todas as chamadas _passivas_ na mesma flag: isso significa que todas as chamadas concorrentes a `std::call_once` têm garantia de observar quaisquer efeitos colaterais feitos pela chamada _ativa_, sem sincronização adicional.

### Parâmetros

- **flag** — um objeto, para o qual exatamente uma função é executada
- **f** — objeto [Callable](<#/doc/named_req/Callable>) a ser invocado
- **args...** — argumentos a serem passados para a função

### Valor de retorno

(nenhum)

### Exceções

*   [std::system_error](<#/doc/error/system_error>) se alguma condição impedir que as chamadas a `std::call_once` sejam executadas conforme especificado.
*   Qualquer exceção lançada por f.

### Notas

Se chamadas concorrentes a `std::call_once` passarem funções f diferentes, é não especificado qual f será chamado. A função selecionada é executada na mesma thread que a invocação de `std::call_once` para a qual foi passada.

A inicialização de [estáticos locais de função](<#/doc/language/storage_duration>) tem garantia de ocorrer apenas uma vez, mesmo quando chamada por múltiplas threads, e pode ser mais eficiente do que o código equivalente usando `std::call_once`.

O equivalente POSIX desta função é [`pthread_once`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_once.html>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <mutex>
    #include <thread>
    
    std::once_flag flag1, flag2;
    
    void simple_do_once()
    {
        std::call_once(flag1, { std::cout << "Simple example: called once\n"; });
    }
    
    void may_throw_function(bool do_throw)
    {
        if (do_throw)
        {
            std::cout << "Throw: call_once will retry\n"; // this may appear more than once
            throw std::exception();
        }
        std::cout << "Did not throw, call_once will not attempt again\n"; // guaranteed once
    }
    
    void do_once(bool do_throw)
    {
        try
        {
            std::call_once(flag2, may_throw_function, do_throw);
        }
        catch (...) {}
    }
    
    int main()
    {
        std::thread st1(simple_do_once);
        std::thread st2(simple_do_once);
        std::thread st3(simple_do_once);
        std::thread st4(simple_do_once);
        st1.join();
        st2.join();
        st3.join();
        st4.join();
    
        std::thread t1(do_once, true);
        std::thread t2(do_once, true);
        std::thread t3(do_once, false);
        std::thread t4(do_once, true);
        t1.join();
        t2.join();
        t3.join();
        t4.join();
    }
```

Saída possível:
```
    Simple example: called once
    Throw: call_once will retry
    Throw: call_once will retry
    Throw: call_once will retry
    Did not throw, call_once will not attempt again
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2080](<https://cplusplus.github.io/LWG/issue2080>) | C++11 | [std::invalid_argument](<#/doc/error/invalid_argument>) seria lançada se f fosse inválido, mas o cenário onde f é invalidado não é especificado | removeu esta condição de erro
[LWG 2442](<https://cplusplus.github.io/LWG/issue2442>) | C++11 | os argumentos eram copiados e/ou movidos antes da invocação | nenhuma cópia/movimentação é realizada

### Veja também

[ once_flag](<#/doc/thread/once_flag>)(C++11) | objeto auxiliar para garantir que `call_once` invoque a função apenas uma vez (classe)
[Documentação C](<#/>) para call_once