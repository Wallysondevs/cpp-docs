# std::promise&lt;R&gt;::set_value

```cpp
Template principal
void set_value( const R& value );  // (1) (desde C++11)
void set_value( R&& value );  // (2) (desde C++11)
Especializações de std::promise<R&>
void set_value( R& value );  // (3) (desde C++11)
Especialização de std::promise<void>
void set_value();  // (4) (desde C++11)
```

  
1-3) Armazena atomicamente o valor no estado compartilhado e torna o estado pronto. 

4) Torna o estado pronto.

A operação se comporta como se `set_value`, [set_exception](<#/doc/thread/promise/set_exception>), [set_value_at_thread_exit](<#/doc/thread/promise/set_value_at_thread_exit>), e [set_exception_at_thread_exit](<#/doc/thread/promise/set_exception_at_thread_exit>) adquirissem um único mutex associado ao objeto promise enquanto atualizam o objeto promise. 

Chamadas a esta função não introduzem condições de corrida (data races) com chamadas a [get_future](<#/doc/thread/promise/get_future>) (portanto, elas não precisam se sincronizar entre si). 

### Parâmetros

value  |  \-  |  valor a ser armazenado no estado compartilhado   
  
### Valor de retorno

(nenhum) 

### Exceções

[std::future_error](<#/doc/thread/future_error>) nas seguintes condições: 

  * *this não possui estado compartilhado. O código de erro é definido como [`no_state`](<#/doc/thread/future_errc>). 
  * O estado compartilhado já armazena um valor ou exceção. O código de erro é definido como [`promise_already_satisfied`](<#/doc/thread/future_errc>). 

Adicionalmente: 

1) Qualquer exceção lançada pelo construtor selecionado para copiar um objeto do tipo `R`.

2) Qualquer exceção lançada pelo construtor selecionado para mover um objeto do tipo `R`.

### Exemplo

Este exemplo mostra como [std::promise](<#/doc/thread/promise>)&lt;void&gt; pode ser usado como sinais entre threads.

Execute este código
```
    #include <algorithm>
    #include <cctype>
    #include <chrono>
    #include <future>
    #include <iostream>
    #include <iterator>
    #include <sstream>
    #include <thread>
    #include <vector>
     
    using namespace std::chrono_literals;
     
    int main()
    {
        std::istringstream iss_numbers{"3 4 1 42 23 -23 93 2 -289 93"};
        std::istringstream iss_letters{" a 23 b,e a2 k k?a;si,ksa c"};
     
        std::vector<int> numbers;
        std::vector<char> letters;
        std::promise<void> numbers_promise, letters_promise;
     
        auto numbers_ready = numbers_promise.get_future();
        auto letter_ready = letters_promise.get_future();
     
        std::thread value_reader([&]
        {
            // I/O operations
            std::copy(std::istream_iterator<int>{iss_numbers},
                      std::istream_iterator<int>{},
                      std::back_inserter(numbers));
     
            // notify for numbers
            numbers_promise.set_value();
     
            std::copy_if(std::istreambuf_iterator<char>{iss_letters},
                         std::istreambuf_iterator<char>{},
                         std::back_inserter(letters),
                         ::isalpha);
     
            // notify for letters
            letters_promise.set_value();
        });
     
     
        numbers_ready.wait();
     
        std::sort(numbers.begin(), numbers.end());
     
        if (letter_ready.wait_for(1s) == std::future_status::timeout)
        {
            // output the numbers while letters are being obtained
            for (int num : numbers)
                std::cout << num << ' ';
            numbers.clear(); // numbers were already printed
        }
     
        letter_ready.wait();
        std::sort(letters.begin(), letters.end());
     
        // does nothing if numbers were already printed
        for (int num : numbers)
            std::cout << num << ' ';
        std::cout << '\n';
     
        for (char let : letters)
            std::cout << let << ' ';
        std::cout << '\n';
     
        value_reader.join();
    }
```

Saída: 
```
    -289 -23 1 2 3 4 23 42 93 93 
    a a a a b c e i k k k s s
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 2098](<https://cplusplus.github.io/LWG/issue2098>) | C++11  | sobrecargas (1,2) podiam lançar apenas as  
exceções lançadas pelo construtor de cópia/movimentação  
de `R` respectivamente  | elas podem lançar as exceções lançadas  
pelo construtor real selecionado  
para copiar/mover um objeto do tipo `R`  
  
### Veja também

[ set_value_at_thread_exit](<#/doc/thread/promise/set_value_at_thread_exit>) | define o resultado para um valor específico, entregando a notificação apenas na saída da thread   
(função membro pública)  
[ set_exception](<#/doc/thread/promise/set_exception>) | define o resultado para indicar uma exceção   
(função membro pública)