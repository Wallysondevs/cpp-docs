# std::ios_base::iword

long& iword( int index );

  
Primeiro, aloca ou redimensiona o armazenamento privado (array dinâmico de long ou outra estrutura de dados indexável) o suficiente para tornar `index` um índice válido, então retorna uma referência ao elemento `long` do armazenamento privado com o índice `index`. 

A referência pode ser invalidada por qualquer operação neste objeto `ios_base`, incluindo outra chamada a `iword()`, mas os valores armazenados são retidos, de modo que a leitura de `iword(index)` com o mesmo índice posteriormente produzirá o mesmo valor até a próxima chamada a [std::basic_ios::copyfmt()](<#/doc/io/basic_ios/copyfmt>). O valor pode ser usado para qualquer finalidade. O índice do elemento deve ser obtido por uma chamada anterior a [xalloc()](<#/doc/io/ios_base/xalloc>), caso contrário, o comportamento é indefinido. Novos elementos são inicializados para ​0​. 

Se a função falhar (possivelmente causada por uma falha de alocação) e `*this` for um subobjeto de classe base de um objeto ou subobjeto `basic_ios<>`, chama [std::basic_ios](<#/doc/io/basic_ios>)<>::setstate(badbit) que pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>). 

### Notas

O uso típico do armazenamento `iword` é para passar informações (por exemplo, flags de formatação personalizadas) de manipuladores de E/S definidos pelo usuário para `operator<<` e `operator>>` definidos pelo usuário ou para facets de formatação definidas pelo usuário imbuídas em streams padrão. 

### Parâmetros

index  |  \-  |  valor do índice do elemento   
  
### Valor de retorno

Uma referência ao elemento. 

### Exceções

Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) ao definir o badbit. 

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <string>
     
    struct Foo
    {
        static int foo_xalloc;
        std::string data; 
     
        Foo(const std::string& s) : data(s) {}
    };
     
    // Allocates the iword storage for use with Foo objects
    int Foo::foo_xalloc = std::ios_base::xalloc();
     
    // This user-defined operator<< prints the string in reverse if the iword holds 1
    std::ostream& operator<<(std::ostream& os, Foo& f)
    {
        if (os.iword(Foo::foo_xalloc) == 1)
            return os << std::string(f.data.rbegin(), f.data.rend());
        else
            return os << f.data;
    }
     
    // This I/O manipulator flips the number stored in iword between 0 and 1
    std::ios_base& rev(std::ios_base& os)
    {
        os.iword(Foo::foo_xalloc) = !os.iword(Foo::foo_xalloc);
        return os;
    }
     
    int main()
    {
        Foo f("example");
        std::cout << f << '\n' << rev << f << '\n' << rev << f << '\n';
    }
```

Output: 
```
    example
    elpmaxe
    example
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 36](<https://cplusplus.github.io/LWG/issue36>) | C++98  | o valor armazenado pode não ser  
retido se a referência for invalidada  | o valor armazenado é retido  
até a próxima chamada de `copyfmt()`  
[LWG 41](<https://cplusplus.github.io/LWG/issue41>) | C++98  | a função definia badbit por si mesma em caso de falha,  
mas `ios_base` não fornece tal interface  | badbit é definido por `basic_ios`  
(se `*this` for seu subobjeto de classe base)   
  
### Veja também

[ pword](<#/doc/io/ios_base/pword>) |  redimensiona o armazenamento privado se necessário e acessa o elemento `void*` no índice fornecido   
(função membro pública)  
[ xalloc](<#/doc/io/ios_base/xalloc>)[static] |  retorna um inteiro único em todo o programa que é seguro para usar como índice para [`pword()`](<#/doc/io/ios_base/pword>) e `iword()`   
(função membro estática pública)