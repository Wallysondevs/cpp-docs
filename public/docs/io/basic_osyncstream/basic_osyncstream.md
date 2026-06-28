# std::basic_osyncstream&lt;CharT,Traits,Allocator&gt;::basic_osyncstream

```cpp
basic_osyncstream( streambuf_type* buf, const Allocator& a );  // (1)
explicit basic_osyncstream( streambuf_type* buf );  // (2)
basic_osyncstream( std::basic_ostream<CharT, Traits>& os, const Allocator& a );  // (3)
explicit basic_osyncstream( std::basic_ostream<CharT, Traits>& os );  // (4)
basic_osyncstream( std::basic_osyncstream&& other ) noexcept;  // (5)
```

  
Constrói um novo stream de saída sincronizado.

1-4) Constrói o membro privado [std::basic_syncbuf](<#/doc/io/basic_syncbuf>) usando o buffer e o allocator fornecidos, e inicializa a classe base com um ponteiro para o membro [std::basic_streambuf](<#/doc/io/basic_streambuf>).

5) Construtor de movimento. Constrói por movimento a base [std::basic_ostream](<#/doc/io/basic_ostream>) e o membro std::basic_syncbuf a partir dos subobjetos correspondentes de other, então chama [`set_rdbuf`](<#/doc/io/basic_ios/set_rdbuf>) com o ponteiro para o [std::basic_syncbuf](<#/doc/io/basic_syncbuf>) subjacente recém-construído para completar a inicialização da base. Após este construtor de movimento, other.get_wrapped() retorna nullptr e a destruição de other não produz saída.

### Parâmetros

buf  |  \-  |  ponteiro para o [std::basic_streambuf](<#/doc/io/basic_streambuf>) que será encapsulado   
---|---|---
os  |  \-  |  referência a um [std::basic_ostream](<#/doc/io/basic_ostream>), cujo rdbuf() será encapsulado   
a  |  \-  |  o allocator a ser passado para o construtor do membro std::basic_syncbuf  
other  |  \-  |  outro osyncstream para mover de   
  
### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <string_view>
    #include <syncstream>
    #include <thread>
    
    void worker(const int id, std::ostream &os)
    {
        std::string_view block;
        switch (id)
        {
            default: [[fallthrough]];
            case 0: block = "██";
                    break;
            case 1: block = "▓▓";
                    break;
            case 2: block = "▒▒";
                    break;
            case 3: block = "░░";
                    break;
        }
        for (int i = 1; i <= 50; ++i)
            os << block << std::flush;
        os << std::endl;
    }
    
    int main()
    {
        std::cout << "Synchronized output should not cause any interference:" << std::endl;
        {
            auto scout1 = std::osyncstream{std::cout};
            auto scout2 = std::osyncstream{std::cout};
            auto scout3 = std::osyncstream{std::cout};
            auto scout4 = std::osyncstream{std::cout};
            auto w1 = std::jthread{worker, 0, std::ref(scout1)};
            auto w2 = std::jthread{worker, 1, std::ref(scout2)};
            auto w3 = std::jthread{worker, 2, std::ref(scout3)};
            auto w4 = std::jthread{worker, 3, std::ref(scout4)};
        }
    
        std::cout << "\nLack of synchronization may cause some interference on output:"
                  << std::endl;
        {
            auto w1 = std::jthread{worker, 0, std::ref(std::cout)};
            auto w2 = std::jthread{worker, 1, std::ref(std::cout)};
            auto w3 = std::jthread{worker, 2, std::ref(std::cout)};
            auto w4 = std::jthread{worker, 3, std::ref(std::cout)};
        }
    }
```

Saída possível: 
```
    Synchronized output should not cause any interference:
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    ████████████████████████████████████████████████████████████████████████████████████████████████████
    
    Lack of synchronization may cause some interference on output:
    ████▓▓██▒▒▒▒▓▓██░░▒▒██░░▒▒░░░░▒▒░░▓▓▒▒██░░████████████▓▓██████▓▓▒▒▓▓██░░████▓▓▓▓██▒▒░░░░░░░░▓▓░░▓▓██▒▒▒▒▒▒▒▒▓▓██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒██░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████▓▓▓▓▓▓▓▓▓▓▓▓░░▓▓▓▓
    ▒▒▒▒██░░██████████████████████████░░░░░░░░░░░░░░██░░▒▒░░░░░░██████████████████
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒
    ░░░░░░
```

### Ver também

[ (constructor)](<#/doc/io/basic_syncbuf/basic_syncbuf>) |  constrói um objeto `basic_syncbuf`   
(função membro pública de `std::basic_syncbuf<CharT,Traits,Allocator>`)  