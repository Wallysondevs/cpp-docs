# std::basic_ostream&lt;CharT,Traits&gt;::flush

basic_ostream& flush();

  
Escreve as alterações não confirmadas para a sequência de saída subjacente. Comporta-se como uma [UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>). 

Se [rdbuf()](<#/doc/io/basic_ios/rdbuf>) for um ponteiro nulo, o objeto sentinela não é construído. 

Caso contrário, após construir e verificar o objeto sentinela, chama rdbuf()->pubsync(). Se a chamada retornar -1, chama setstate(badbit). 

### Parâmetros

(nenhum) 

### Valor de retorno

*this

### Exceções

Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) se (exceptions() & badbit) != 0. 

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    #include <thread>
     
    using namespace std::chrono_literals;
     
    void f()
    {
        std::cout << "Output from thread... ";
        for (int i{1}; i != 10; ++i)
        {
            std::this_thread::sleep_for(250ms);
            std::cout << i << ' ';
     
            // output three numbers at once;
            // the effect is observable only in real-time
            if (0 == (i % 3))
                std::cout.flush();
        }
        std::cout << std::endl; // flushes as well
    }
     
    int main()
    {
        std::thread tr{f};
        std::this_thread::sleep_for(150ms);
        std::clog << "Output from main\n";
        tr.join();
    }
```

Saída: 
```
    Output from main
    Output from thread... 1 2 3 4 5 6 7 8 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 581](<https://cplusplus.github.io/LWG/issue581>) | C++98  | `flush()` não se comportava como uma [UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>)  
devido à resolução do [LWG issue 60](<https://cplusplus.github.io/LWG/issue60>) | comporta-se como uma  
[UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>)  
  
### Ver também

[ pubsync](<#/doc/io/basic_streambuf/pubsync>) |  invoca sync()   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ sync](<#/doc/io/basic_streambuf/pubsync>)[virtual] |  sincroniza os buffers com a sequência de caracteres associada   
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)  
[ flush](<#/doc/io/manip/flush>) |  descarrega o stream de saída   
(modelo de função)  
[ endl](<#/doc/io/manip/endl>) |  produz '\n' e descarrega o stream de saída   
(modelo de função)  
[ sync](<#/doc/io/basic_istream/sync>) |  sincroniza com o dispositivo de armazenamento subjacente   
(função membro pública de `std::basic_istream<CharT,Traits>`)