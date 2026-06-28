# std::packaged_task&lt;R(Args...)&gt;::packaged_task

```cpp
packaged_task() noexcept;  // (1) (desde C++11)
template< class F >
explicit packaged_task( F&& f );  // (2) (desde C++11)
template< class F, class Allocator >
explicit packaged_task( std::allocator_arg_t, const Allocator& a, F&& f );  // (3) (desde C++11)
(até C++17)
packaged_task( const packaged_task& ) = delete;  // (4) (desde C++11)
packaged_task( packaged_task&& rhs ) noexcept;  // (5) (desde C++11)
```

Constrói um novo objeto `std::packaged_task`.

1) Constrói um objeto `std::packaged_task` sem tarefa e sem estado compartilhado.

2,3) Constrói um objeto `std::packaged_task` com um estado compartilhado e uma cópia da tarefa, inicializada com [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f). O allocator `a` é usado para alocar a memória necessária para armazenar a tarefa. (até C++17)

Essas sobrecargas participam da resolução de sobrecarga apenas se [std::decay](<#/doc/types/decay>)&lt;F&gt;::type não for do mesmo tipo que [std::packaged_task](<#/doc/thread/packaged_task>)<R(Args...)>. Sejam t1, t2, ..., tN valores dos tipos correspondentes em `Args`, se [`_INVOKE <R>_`](<#/doc/utility/functional>)(f, t1, t2, ..., tN) não for uma expressão válida, o programa é malformado. | (até C++17)
---|---
Se [std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, F&, Args...> for falso, o programa é malformado. | (desde C++17)

Se invocar `f` e invocar uma cópia de `f` se comportarem de forma diferente, o comportamento é indefinido.

4) O construtor de cópia é deletado, `std::packaged_task` é apenas movível (move-only).

5) Constrói um `std::packaged_task` com o estado compartilhado e a tarefa anteriormente possuídos por `rhs`, deixando `rhs` sem estado compartilhado e com uma tarefa movida (moved-from).

### Parâmetros

- **f** — o alvo chamável (função, função membro, expressão lambda, objeto de função) a ser executado
- **a** — o allocator a ser usado ao armazenar a tarefa
- **rhs** — o `std::packaged_task` do qual mover

### Exceções

2) Quaisquer exceções lançadas pelo construtor de cópia/movimento de `f` e possivelmente [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação falhar.

3) Quaisquer exceções lançadas pelo construtor de cópia/movimento de `f` e pela função `allocate` do allocator se a alocação de memória falhar.

### Exemplo

Run this code
```
    #include <future>
    #include <iostream>
    #include <thread>
     
    int fib(int n)
    {
        if (n < 3)
            return 1;
        else
            return fib(n - 1) + fib(n - 2);
    }
     
    int main()
    {
        std::packaged_task<int(int)> fib_task(&fib);
     
        std::cout << "Starting task\n";
        auto result = fib_task.get_future();
        std::thread t(std::move(fib_task), 42);
     
        std::cout << "Waiting for task to finish..." << std::endl;
        std::cout << result.get() << '\n';
     
        std::cout << "Task complete\n";
        t.join();
    }
```

Saída:
```
    Starting task
    Waiting for task to finish...
    267914296
    Task complete
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2067](<https://cplusplus.github.io/LWG/issue2067>) | C++11 | o tipo do parâmetro do construtor de cópia era `packaged_task&` | adicionado `const`
[LWG 2097](<https://cplusplus.github.io/LWG/issue2097>) | C++11 | para as sobrecargas (2,3), `F` poderia ser `std::packaged_task<R(Args...)>` | `F` é restrito