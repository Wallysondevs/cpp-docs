# std::ios_base::pword

void*& pword( int index );

  
Primeiro, aloca ou redimensiona o armazenamento privado (array dinâmico de `void*` ou outra estrutura de dados indexável) o suficiente para tornar `index` um índice válido, então retorna uma referência ao elemento `void*` do armazenamento privado com o índice `index`.

A referência pode ser invalidada por qualquer operação neste objeto `ios_base`, incluindo outra chamada a `pword()`, mas os valores armazenados são retidos, de modo que a leitura de `pword(index)` com o mesmo índice posteriormente produzirá o mesmo valor até a próxima chamada a [std::basic_ios::copyfmt()](<#/doc/io/basic_ios/copyfmt>). O valor pode ser usado para qualquer propósito. O índice do elemento deve ser obtido por [xalloc()](<#/doc/io/ios_base/xalloc>), caso contrário, o comportamento é indefinido. Novos elementos são inicializados para um [ponteiro nulo](<#/doc/language/pointer>).

Se a função falhar (possivelmente causada por uma falha de alocação) e `*this` for um subobjeto de classe base de um objeto ou subobjeto `basic_ios<>`, chama [std::basic_ios](<#/doc/io/basic_ios>)<>::setstate(badbit) que pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>).

### Parâmetros

index  |  \-  |  valor do índice do elemento   
  
### Valor de retorno

Uma referência ao elemento.

### Exceções

Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) ao definir o badbit.

### Notas

Se os ponteiros armazenados em `pword` exigirem gerenciamento, [register_callback()](<#/doc/io/ios_base/register_callback>) pode ser usado para instalar manipuladores que executam cópia profunda ou desalocação conforme necessário.

### Exemplo

Usa o armazenamento `pword` da classe base para identificação de tipo em tempo de execução de objetos de stream derivados.

Execute este código
```
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
     
    // Cada especialização de mystream obtém um índice único de xalloc()
    template<class CharT, class Traits>
    const int mystream<CharT, Traits>::xindex = std::ios_base::xalloc();
     
    // Este manipulador de E/S será capaz de reconhecer ostreams que são mystreams
    // procurando o ponteiro armazenado em pword
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
[LWG 36](<https://cplusplus.github.io/LWG/issue36>) | C++98  | o valor armazenado pode não ser  
retido se a referência for invalidada  | o valor armazenado é retido  
até a próxima chamada de `copyfmt()`  
[LWG 41](<https://cplusplus.github.io/LWG/issue41>) | C++98  | a função definia badbit por si mesma em caso de falha,  
mas `ios_base` não fornece tal interface  | badbit é definido por `basic_ios`  
(se `*this` for seu subobjeto de classe base)   
  
### Veja também

[ iword](<#/doc/io/ios_base/iword>) |  redimensiona o armazenamento privado se necessário e acessa o elemento long no índice fornecido   
(função membro pública)  
[ xalloc](<#/doc/io/ios_base/xalloc>)[static] |  retorna um inteiro único em todo o programa que é seguro para usar como índice para `pword()` e [`iword()`](<#/doc/io/ios_base/iword>)   
(função membro estática pública)