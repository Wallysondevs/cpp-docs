# std::future&lt;T&gt;::get

```cpp
Modelo principal
T get();  // (1) (desde C++11)
Especializações de std::future<T&>
T& get();  // (2) (desde C++11)
Especialização de std::future<void>
void get();  // (3) (desde C++11)
```

  
A função membro `get` espera (chamando [wait()](<#/doc/thread/future/wait>)) até que o estado compartilhado esteja pronto, então recupera o valor armazenado no estado compartilhado (se houver). Logo após chamar esta função, [valid()](<#/doc/thread/future/valid>) é false.

Se [valid()](<#/doc/thread/future/valid>) for false antes da chamada a esta função, o comportamento é indefinido.

### Valor de retorno

1) O valor v armazenado no estado compartilhado, como std::move(v).

2) A referência armazenada como valor no estado compartilhado.

3) (nenhum)

### Exceções

Se uma exceção foi armazenada no estado compartilhado referenciado pelo future (por exemplo, através de uma chamada a [`std::promise::set_exception()`](<#/doc/thread/promise/set_exception>)), então essa exceção será lançada.

### Notas

O padrão C++ recomenda que as implementações detectem o caso em que [valid()](<#/doc/thread/future/valid>) é false antes da chamada e lancem uma [std::future_error](<#/doc/thread/future_error>) com uma condição de erro de [std::future_errc::no_state](<#/doc/thread/future_errc>).

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <future>
    #include <iostream>
    #include <string>
    #include <thread>
    
    std::string time()
    {
        static auto start = std::chrono::steady_clock::now();
        std::chrono::duration<double> d = std::chrono::steady_clock::now() - start;
        return "[" + std::to_string(d.count()) + "s]";
    }
    
    int main()
    {
        using namespace std::chrono_literals;
    
        {
            std::cout << time() << " launching thread\n";
            std::future<int> f = std::async(std::launch::async, []
            {
                std::this_thread::sleep_for(1s);
                return 7;
            });
            std::cout << time() << " waiting for the future, f.valid() = "
                      << f.valid() << '\n';
            int n = f.get();
            std::cout << time() << " f.get() returned " << n << ", f.valid() = "
                      << f.valid() << '\n';
        }
    
        {
            std::cout << time() << " launching thread\n";
            std::future<int> f = std::async(std::launch::async, []
            {
                std::this_thread::sleep_for(1s);
                return true ? throw std::runtime_error("7") : 7;
            });
            std::cout << time() << " waiting for the future, f.valid() = "
                      << f.valid() << '\n';
    
            try
            {
                int n = f.get();
                std::cout << time() << " f.get() returned " << n
                          << ", f.valid() = " << f.valid() << '\n';
            }
            catch (const std::exception& e)
            {
                std::cout << time() << " caught exception " << e.what()
                          << ", f.valid() = " << f.valid() << '\n';
            }
        }
    }
```

Saída possível:
```
    [0.000004s] launching thread
    [0.000461s] waiting for the future, f.valid() = 1
    [1.001156s] f.get() returned with 7, f.valid() = 0
    [1.001192s] launching thread
    [1.001275s] waiting for the future, f.valid() = 1
    [2.002356s] caught exception 7, f.valid() = 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 2096](<https://cplusplus.github.io/LWG/issue2096>) | C++11  | sobrecarga (1) precisava verificar se `T` é [MoveAssignable](<#/doc/named_req/MoveAssignable>) | não requerido   
  
### Veja também

[ valid](<#/doc/thread/future/valid>) |  verifica se o future possui um estado compartilhado   
(função membro pública)  