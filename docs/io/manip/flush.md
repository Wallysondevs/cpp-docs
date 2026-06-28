# std::flush

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>& flush( std::basic_ostream<CharT, Traits>& os );
```

Descarrega a sequência de saída `os` como se chamasse `os.flush()`.

Este é um manipulador de E/S (I/O) apenas de saída, ele pode ser chamado com uma expressão como `out << std::flush` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>).

### Notas

Este manipulador pode ser usado para produzir uma linha de saída incompleta imediatamente, por exemplo, ao exibir a saída de um processo de longa duração, registrar a atividade de múltiplas threads ou registrar a atividade de um programa que pode falhar inesperadamente. Um descarregamento explícito de [std::cout](<#/doc/io/cout>) também é necessário antes de uma chamada para [std::system](<#/doc/utility/program/system>), se o processo gerado realizar qualquer E/S de tela (um exemplo comum é [std::system](<#/doc/utility/program/system>)("pause") no Windows). Na maioria dos outros cenários usuais de E/S interativa, [std::endl](<#/doc/io/manip/endl>) é redundante quando usado com [std::cout](<#/doc/io/cout>) porque qualquer entrada de [std::cin](<#/doc/io/cin>), saída para [std::cerr](<#/doc/io/cerr>), ou terminação do programa força uma chamada para [std::cout](<#/doc/io/cout>).flush().

Quando uma linha completa de saída precisa ser descarregada, o manipulador [std::endl](<#/doc/io/manip/endl>) pode ser usado.

Quando cada operação de saída precisa ser descarregada, o manipulador [std::unitbuf](<#/doc/io/manip/unitbuf>) pode ser usado.

### Parâmetros

- **os** — referência para o stream de saída

### Valor de retorno

`os` (referência para o stream após a manipulação).

### Exemplo

Sem `std::flush`, a saída seria a mesma, mas pode não aparecer em tempo real.

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    template<typename Diff>
    void log_progress(Diff d)
    {
        std::cout << std::chrono::duration_cast<std::chrono::milliseconds>(d) << " ... "
                  << std::flush;
    }
     
    int main()
    {
        volatile int sink = 0;
     
        auto t1 = std::chrono::high_resolution_clock::now();
        for (int j = 0; j < 5; ++j)
        {
            for (int n = 0; n < 10000; ++n)
                for (int m = 0; m < 20000; ++m)
                    sink += m * n; // do some work
            auto now = std::chrono::high_resolution_clock::now();
            log_progress(now - t1);
        }
        std::cout << '\n';
    }
```

Saída possível:
```
    567ms ... 1137ms ... 1707ms ... 2269ms ... 2842ms ...
```

### Veja também

[ unitbufnounitbuf](<#/doc/io/manip/unitbuf>) | controla se a saída é descarregada após cada operação
(função)
[ endl](<#/doc/io/manip/endl>) | imprime '\n' e descarrega o stream de saída
(modelo de função)
[ flush](<#/doc/io/basic_ostream/flush>) | sincroniza com o dispositivo de armazenamento subjacente
(função membro pública de `std::basic_ostream<CharT,Traits>`)