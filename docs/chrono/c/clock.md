# std::clock

Definido no cabeçalho `[<ctime>](<#/doc/header/ctime>)`

```c
std::clock_t clock();
```

Retorna o tempo de processador aproximado usado pelo processo desde o início de uma era definida pela implementação, relacionada à execução do programa. Para converter o valor do resultado para segundos, divida-o por [CLOCKS_PER_SEC](<#/doc/chrono/c/CLOCKS_PER_SEC>).

Apenas a diferença entre dois valores retornados por chamadas diferentes a `std::clock` é significativa, pois o início da era de `std::clock` não precisa coincidir com o início do programa.

O tempo de `std::clock` pode avançar mais rápido ou mais lento que o relógio de parede (wall clock), dependendo dos recursos de execução concedidos ao programa pelo sistema operacional. Por exemplo, se a CPU for compartilhada por outros processos, o tempo de `std::clock` pode avançar mais lentamente que o relógio de parede. Por outro lado, se o processo atual for multithreaded e mais de um núcleo de execução estiver disponível, o tempo de `std::clock` pode avançar mais rapidamente que o relógio de parede.

### Valor de retorno

Tempo de processador usado pelo programa até o momento.

*   Se o tempo de processador usado não estiver disponível, retorna ([std::clock_t](<#/doc/chrono/c/clock_t>))(-1).
*   Se o valor do tempo de processador usado não puder ser representado por [std::clock_t](<#/doc/chrono/c/clock_t>), retorna um valor não especificado.

### Exceções

Não lança exceções.

### Notas

Em sistemas compatíveis com POSIX, [`clock_gettime`](<https://pubs.opengroup.org/onlinepubs/9799919799/functions/clock_getres.html>) com o ID de clock CLOCK_PROCESS_CPUTIME_ID oferece melhor resolução.

O valor retornado por `clock()` pode sofrer *wrap around* (estouro) em algumas implementações. Por exemplo, em tal implementação, se [std::clock_t](<#/doc/chrono/c/clock_t>) for um inteiro assinado de 32 bits e [CLOCKS_PER_SEC](<#/doc/chrono/c/CLOCKS_PER_SEC>) for 1'000'000, ele sofrerá *wrap around* após cerca de 2147 segundos (cerca de 36 minutos).

### Exemplo

Este exemplo demonstra a diferença entre o tempo de `clock()` e o tempo real.

Execute este código
```cpp
    #include <chrono>
    #include <ctime>
    #include <iomanip>
    #include <iostream>
    #include <thread>
    
    // A função f() realiza algum trabalho que consome tempo.
    void f()
    {
        volatile double d = 0;
        for (int n = 0; n != 10000; ++n)
            for (int m = 0; m != 10000; ++m)
                d += d * n * m;
    }
    
    int main()
    {
        const std::clock_t c_start = std::clock();
        auto t_start = std::chrono::high_resolution_clock::now();
        std::thread t1(f);
        std::thread t2(f); // f() é chamada em duas threads
        t1.join();
        t2.join();
        const std::clock_t c_end = std::clock();
        const auto t_end = std::chrono::high_resolution_clock::now();
    
        std::cout << std::fixed << std::setprecision(2) << "Tempo de CPU usado: "
                  << 1000.0 * (c_end - c_start) / CLOCKS_PER_SEC << "ms\n"
                  << "Tempo de relógio de parede decorrido: "
                  << std::chrono::duration<double, std::milli>(t_end - t_start) << '\n';
    }
```

Saída possível:
```
    CPU time used: 1590.00ms
    Wall clock time passed: 808.23ms
```

### Veja também

[ ctime](<#/doc/chrono/c/ctime>) | converte um objeto [std::time_t](<#/doc/chrono/c/time_t>) para uma representação textual
(função)
[ time](<#/doc/chrono/c/time>) | retorna o tempo atual do sistema como tempo desde a época (epoch)
(função)
[Documentação C](<#/>) para clock