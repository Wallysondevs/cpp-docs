# std::endl

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>& endl( std::basic_ostream<CharT, Traits>& os );
```

Insere um caractere de nova linha na sequência de saída `os` e a descarrega (flushes) como se chamasse `os.put(os.widen('\n'))` seguido por `os.flush()`.

Este é um manipulador de E/S (I/O) somente de saída, ele pode ser chamado com uma expressão como `out << std::endl` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>).

### Observações

Este manipulador pode ser usado para produzir uma linha de saída imediatamente, por exemplo, ao exibir a saída de um processo de longa duração, registrar a atividade de múltiplas threads ou registrar a atividade de um programa que pode falhar inesperadamente. Um descarregamento explícito (flush) de [std::cout](<#/doc/io/cout>) também é necessário antes de uma chamada para [std::system](<#/doc/utility/program/system>), se o processo gerado realizar qualquer E/S de tela. Na maioria dos outros cenários usuais de E/S interativa, `std::endl` é redundante quando usado com [std::cout](<#/doc/io/cout>) porque qualquer entrada de [std::cin](<#/doc/io/cin>), saída para [std::cerr](<#/doc/io/cerr>), ou terminação do programa força uma chamada para [std::cout](<#/doc/io/cout>).flush(). O uso de `std::endl` no lugar de '\n', encorajado por algumas fontes, pode degradar significativamente o desempenho da saída.

Em muitas implementações, a saída padrão é armazenada em buffer por linha (line-buffered), e escrever '\n' causa um descarregamento de qualquer forma, a menos que `std::ios::sync_with_stdio(false)` tenha sido executado. Nessas situações, um `endl` desnecessário apenas degrada o desempenho da saída para arquivo, não da saída padrão.

Os exemplos de código nesta wiki [seguem Bjarne Stroustrup](<https://www.stroustrup.com/3rd_code.html>) e [As Diretrizes Essenciais do C++ (The C++ Core Guidelines)](<https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rio-endl>) ao descarregar a saída padrão apenas quando necessário.

Quando uma linha de saída incompleta precisa ser descarregada, o manipulador [std::flush](<#/doc/io/manip/flush>) pode ser usado.

Quando cada caractere de saída precisa ser descarregado, o manipulador [std::unitbuf](<#/doc/io/manip/unitbuf>) pode ser usado.

### Parâmetros

- **os** — referência para o stream de saída

### Valor de retorno

`os` (referência para o stream após a manipulação).

### Exemplo

Com '\n' em vez de `endl`, a saída seria a mesma, mas pode não aparecer em tempo real.

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    template<typename Diff>
    void log_progress(Diff d)
    {
        std::cout << std::chrono::duration_cast<std::chrono::milliseconds>(d)
                  << " passed" << std::endl;
    }
     
    int main()
    {
        std::cout.sync_with_stdio(false); // em algumas plataformas, stdout descarrega em \n
     
        static volatile int sink{};
        const auto t1 = std::chrono::high_resolution_clock::now();
        for (int i = 0; i < 5; ++i)
        {
            for (int j = 0; j < 10000; ++j)
                for (int k = 0; k < 20000; ++k)
                    sink += i * j * k; // faz algum trabalho
            log_progress(std::chrono::high_resolution_clock::now() - t1);
        }
    }
```

Saída possível:
```
    566ms passed
    1133ms passed
    1699ms passed
    2262ms passed
    2829ms passed
```

### Veja também

[ unitbufnounitbuf](<#/doc/io/manip/unitbuf>) | controla se a saída é descarregada após cada operação
(função)
[ flush](<#/doc/io/manip/flush>) | descarrega o stream de saída
(modelo de função)
[ flush](<#/doc/io/basic_ostream/flush>) | sincroniza com o dispositivo de armazenamento subjacente
(função membro pública de `std::basic_ostream<CharT,Traits>`)