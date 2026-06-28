# std::shared_future&lt;T&gt;::wait

void wait() const; |  |  (desde C++11)  

  
Bloqueia até que o resultado esteja disponível. `valid() == true` após a chamada. 

O comportamento é indefinido se [`valid`](<#/doc/thread/shared_future/valid>)() == false antes da chamada a esta função. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Observações

As implementações são encorajadas a detectar o caso em que `valid() == false` antes da chamada e lançar um [std::future_error](<#/doc/thread/future_error>) com uma condição de erro de [std::future_errc::no_state](<#/doc/thread/future_errc>). 

Chamar `wait` no mesmo `std::shared_future` a partir de múltiplas threads não é seguro; o uso pretendido é que cada thread que espera no mesmo estado compartilhado tenha uma cópia de um `std::shared_future`. 

### Exemplo

Execute este código
```cpp
    #include <chrono>
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
        std::shared_future<int> f1 = std::async(std::launch::async,  { return fib(40); });
        std::shared_future<int> f2 = std::async(std::launch::async,  { return fib(43); });
    
        std::cout << "waiting... " << std::flush;
        const auto start = std::chrono::system_clock::now();
    
        f1.wait();
        f2.wait();
    
        const auto diff = std::chrono::system_clock::now() - start;
        std::cout << std::chrono::duration<double>(diff).count() << " seconds\n";
    
        std::cout << "f1: " << f1.get() << '\n';
        std::cout << "f2: " << f2.get() << '\n';
    }
```

Saída possível: 
```
    waiting... 1.61803 seconds
    f1: 102334155
    f2: 433494437
```

### Veja também

[ wait_for](<#/doc/thread/shared_future/wait_for>) | espera pelo resultado, retorna se não estiver disponível pela duração de timeout especificada   
(função membro pública)  
[ wait_until](<#/doc/thread/shared_future/wait_until>) | espera pelo resultado, retorna se não estiver disponível até que o ponto no tempo especificado tenha sido atingido   
(função membro pública)