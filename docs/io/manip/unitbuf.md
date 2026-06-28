# std::unitbuf, std::nounitbuf

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
std::ios_base& unitbuf( std::ios_base& str );
std::ios_base& nounitbuf( std::ios_base& str );
```

Habilita ou desabilita o descarregamento automático (flushing) do stream de saída após qualquer operação de saída. Não tem efeito na entrada.

1) Habilita a flag `unitbuf` no stream str como se chamasse str.setf([std::ios_base::unitbuf](<#/doc/io/ios_base/fmtflags>)).

2) Desabilita a flag `unitbuf` no stream str como se chamasse str.unsetf([std::ios_base::unitbuf](<#/doc/io/ios_base/fmtflags>)).

Este é um manipulador de E/S, ele pode ser chamado com uma expressão como `out << std::unitbuf` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) ou com uma expressão como `in >> std::unitbuf` para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

### Notas

O descarregamento (flushing) é realizado no destrutor do objeto [std::basic_ostream::sentry](<#/doc/io/basic_ostream/sentry>), que chama `str.rdbuf()->pubsync()` se `str.flags() & std::ios_base::unitbuf` for verdadeiro.

Os objetos de saída padrão [std::cerr](<#/doc/io/cerr>) e [std::wcerr](<#/doc/io/cerr>) têm seu bit `unitbuf` definido por padrão.

### Parâmetros

- **str** — referência para stream de E/S

### Valor de retorno

str (referência para o stream após a manipulação).

### Exemplo

Sem `std::unitbuf` ou outro descarregamento explícito, a saída é a mesma, mas não aparece em tempo real.

Run this code
```cpp
    #include <chrono>
    #include <iostream>
    
    template<typename Diff>
    void log_progress(Diff d)
    {
        std::cout << std::chrono::duration_cast<std::chrono::milliseconds>(d)
                  << " ... ";
    }
    
    int main()
    {
        volatile int sink = 0;
        std::cout << std::unitbuf; // enable automatic flushing
    
        const auto start = std::chrono::high_resolution_clock::now();
        for (int j = 0; j < 5; ++j)
        {
            for (int n = 0; n < 10000; ++n)
                for (int m = 0; m < 20000; ++m)
                    sink += m * n; // do some work
            log_progress(std::chrono::high_resolution_clock::now() - start);
        }
        std::cout << '\n';
    }
```

Output:
```
    571ms ... 1146ms ... 1722ms ... 2294ms ... 2865ms ...
```

### Veja também

[ flush](<#/doc/io/manip/flush>) | descarrega o stream de saída
(modelo de função)
[ endl](<#/doc/io/manip/endl>) | imprime '\n' e descarrega o stream de saída
(modelo de função)