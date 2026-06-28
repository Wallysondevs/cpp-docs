# std::packaged_task

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
template< class > class packaged_task; //não definido
template< class R, class ...ArgTypes >
class packaged_task<R(ArgTypes...)>;
```

O template de classe `std::packaged_task` encapsula qualquer alvo [Callable](<#/doc/named_req/Callable>) (função, expressão lambda, expressão bind, ou outro objeto de função) para que possa ser invocado assincronamente. Seu valor de retorno ou exceção lançada é armazenado em um estado compartilhado que pode ser acessado através de objetos [std::future](<#/doc/thread/future>).

Assim como [std::function](<#/doc/utility/functional/function>), `std::packaged_task` é um container polimórfico e ciente de alocador: o alvo callable armazenado pode ser alocado na heap ou com um alocador fornecido. | (ate C++17)

### Funções membro

[ (construtor)](<#/doc/thread/packaged_task/packaged_task>) | constrói o objeto task
(função membro pública)
[ (destrutor)](<#/doc/thread/packaged_task/~packaged_task>) | destrói o objeto task
(função membro pública)
[ operator=](<#/>) | move o objeto task
(função membro pública)
[ valid](<#/doc/thread/packaged_task/valid>) | verifica se o objeto task possui uma função válida
(função membro pública)
[ swap](<#/doc/thread/packaged_task/swap>) | troca dois objetos task
(função membro pública)

##### Obtendo o resultado

[ get_future](<#/doc/thread/packaged_task/get_future>) | retorna um [std::future](<#/doc/thread/future>) associado ao resultado prometido
(função membro pública)

##### Execução

[ operator()](<#/>) | executa a função
(função membro pública)
[ make_ready_at_thread_exit](<#/doc/thread/packaged_task/make_ready_at_thread_exit>) | executa a função garantindo que o resultado esteja pronto somente quando a thread atual sair
(função membro pública)
[ reset](<#/doc/thread/packaged_task/reset>) | reinicia o estado abandonando quaisquer resultados armazenados de execuções anteriores
(função membro pública)

### Funções não-membro

[ std::swap(std::packaged_task)](<#/doc/thread/packaged_task/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### Classes auxiliares

[ std::uses_allocator<std::packaged_task>](<#/doc/thread/packaged_task/uses_allocator>)(C++11) (ate C++17) | especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de template de classe)

### [Guias de dedução](<#/doc/thread/packaged_task/deduction_guides>)(desde C++17)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <functional>
    #include <future>
    #include <iostream>
    #include <thread>
    
    // unique function to avoid disambiguating the std::pow overload set
    int f(int x, int y) { return std::pow(x, y); }
    
    void task_lambda()
    {
        std::packaged_task<int(int, int)> task(
        {
            return std::pow(a, b); 
        });
        std::future<int> result = task.get_future();
    
        task(2, 9);
    
        std::cout << "task_lambda:\t" << result.get() << '\n';
    }
    
    void task_bind()
    {
        std::packaged_task<int()> task(std::bind(f, 2, 11));
        std::future<int> result = task.get_future();
    
        task();
    
        std::cout << "task_bind:\t" << result.get() << '\n';
    }
    
    void task_thread()
    {
        std::packaged_task<int(int, int)> task(f);
        std::future<int> result = task.get_future();
    
        std::thread task_td(std::move(task), 2, 10);
        task_td.join();
    
        std::cout << "task_thread:\t" << result.get() << '\n';
    }
    
    int main()
    {
        task_lambda();
        task_bind();
        task_thread();
    }
```

Saída:
```
    task_lambda: 512
    task_bind:   2048
    task_thread: 1024
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3117](<https://cplusplus.github.io/LWG/issue3117>) | C++17 | guias de dedução para `packaged_task` estavam faltando | adicionado

### Veja também

[ future](<#/doc/thread/future>)(C++11) | aguarda por um valor que é definido assincronamente
(template de classe)