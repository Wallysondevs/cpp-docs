# std::packaged_task&lt;R(Args...)&gt;::reset

```cpp
void reset();  // (desde C++11)
```

  
Reinicia o estado, abandonando os resultados de execuções anteriores. Um novo estado compartilhado é construído.

Equivalente a `*this = packaged_task(std::move(f))`, onde `f` é a tarefa armazenada.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

  * [std::future_error](<#/doc/thread/future_error>) se *this não tiver estado compartilhado. A condição de erro é definida como [`no_state`](<#/doc/thread/future_errc>).
  * [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se não houver memória suficiente para um novo estado compartilhado.
  * Qualquer exceção lançada pelo [construtor de movimento](<#/doc/thread/packaged_task/packaged_task>) da nova `packaged_task`.

### Exemplo

Execute este código
```
    #include <cmath>
    #include <future>
    #include <iostream>
    #include <thread>
     
    int main()
    {
        std::packaged_task<int(int,int)> task(
        {
            return std::pow(a, b);
        });
        std::future<int> result = task.get_future();
        task(2, 9);
        std::cout << "2^9 = " << result.get() << '\n';
     
        task.reset();
        result = task.get_future();
        std::thread task_td(std::move(task), 2, 10);
        task_td.join();
        std::cout << "2^10 = " << result.get() << '\n';
    }
```

Saída: 
```
    2^9 = 512
    2^10 = 1024
```