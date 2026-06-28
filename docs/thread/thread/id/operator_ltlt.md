# operator&lt;&lt;(std::thread::id)

Definido no header `[<thread>](<#/doc/header/thread>)`

```cpp
template< class CharT, class Traits >
std::basic_ostream<CharT,Traits>&
operator<<( std::basic_ostream<CharT,Traits>& ost, std::thread::id id );  // (desde C++11)
```

Escreve uma representação textual de um identificador de thread id para o stream de saída ost.

Se dois identificadores de thread se comparam como iguais, eles possuem representações textuais idênticas; se eles não se comparam como iguais, suas representações são distintas.

### Parâmetros

- **ost** — stream de saída para inserir os dados
- **id** — identificador de thread

### Valor de retorno

ost

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    #include <thread>
    using namespace std::chrono;
    
    int main()
    {
        std::thread t1([]{ std::this_thread::sleep_for(256ms); });
        std::thread t2([]{ std::this_thread::sleep_for(512ms); });
    
        std::clog << t1.get_id() << '\n' << t2.get_id() << '\n';
    
        t1.join();
        t2.join();
    }
```

Saída possível:
```
    141592653589793
    141421356237309
```