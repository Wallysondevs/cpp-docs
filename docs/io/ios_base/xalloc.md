# std::ios_base::xalloc

static int xalloc();

  
Retorna um valor de índice único (em todo o programa) que pode ser usado para acessar um elemento long e um elemento void* no armazenamento privado de `std::ios_base` chamando [iword()](<#/doc/io/ios_base/iword>) e [pword()](<#/doc/io/ios_base/pword>). A chamada para `xalloc` não aloca memória. 

Esta função é thread-safe: o acesso concorrente por múltiplas threads não resulta em uma condição de corrida (data race). | (desde C++11)  
  
Efetivamente incrementa o próximo índice único disponível. 

### Valor de retorno

Inteiro único para uso como índice pword/iword. 

### Exemplo

Usa o armazenamento pword da classe base para identificação de tipo em tempo de execução de objetos de stream derivados.

Execute este código
```cpp
    #include <iostream>
    
    template<class CharT, class Traits = std::char_traits<CharT>>
    class mystream : public std::basic_ostream<CharT, Traits>
    {
    public:
        static const int xindex;
    
        mystream(std::basic_ostream<CharT, Traits>& ostr) :
            std::basic_ostream<CharT, Traits>(ostr.rdbuf())
        {
            this->pword(xindex) = this;
        }
    
        void myfn()
        {
            *this << "[special handling for mystream]";
        }
    };
    
    // Each specialization of mystream obtains a unique index from xalloc()
    template<class CharT, class Traits>
    const int mystream<CharT, Traits>::xindex = std::ios_base::xalloc();
    
    // This I/O manipulator will be able to recognize ostreams that are mystreams
    // by looking up the pointer stored in pword
    template<class CharT, class Traits>
    std::basic_ostream<CharT, Traits>& mymanip(std::basic_ostream<CharT, Traits>& os)
    {
        if (os.pword(mystream<CharT, Traits>::xindex) == &os)
            static_cast<mystream<CharT, Traits>&>(os).myfn();
        return os;
    }
    
    int main()
    {
        std::cout << "cout, narrow-character test " << mymanip << '\n';
    
        mystream<char> myout(std::cout);
        myout << "myout, narrow-character test " << mymanip << '\n';
    
        std::wcout << "wcout, wide-character test " << mymanip << '\n';
    
        mystream<wchar_t> mywout(std::wcout);
        mywout << "mywout, wide-character test " << mymanip << '\n';
    }
```

Saída: 
```
    cout, narrow-character test
    myout, narrow-character test [special handling for mystream]
    wcout, wide-character test
    mywout, wide-character test [special handling for mystream]
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2143](<https://cplusplus.github.io/LWG/issue2143>) | C++11  | `xalloc` não era thread-safe  | tornado thread-safe   
  
### Veja também

[ pword](<#/doc/io/ios_base/pword>) | redimensiona o armazenamento privado se necessário e acessa o elemento void* no índice fornecido   
(função membro pública)  
[ iword](<#/doc/io/ios_base/iword>) | redimensiona o armazenamento privado se necessário e acessa o elemento long no índice fornecido   
(função membro pública)