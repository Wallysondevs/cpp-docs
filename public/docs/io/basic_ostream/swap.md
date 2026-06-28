# std::basic_ostream&lt;CharT,Traits&gt;::swap

```cpp
protected:
void swap( basic_ostream& rhs );  // (desde C++11)
```

  
Chama basic_ios::swap(rhs) para trocar todos os membros de dados da classe base, exceto rdbuf(), entre *this e rhs. Esta função swap é protegida: ela é chamada pelas funções swap das classes de stream de saída trocáveis [std::basic_ofstream](<#/doc/io/basic_ofstream>) e [std::basic_ostringstream](<#/doc/io/basic_ostringstream>), que sabem como trocar corretamente os streambuffers associados. 

### Parâmetros

rhs  |  \-  |  um basic_ostream do mesmo tipo para trocar com   
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
    #include <utility>
     
    int main()
    {
        std::ostringstream s1("hello");
        std::ostringstream s2("bye");
     
        s1.swap(s2); // OK, ostringstream tem um swap() público
        std::swap(s1, s2); // OK, chama s1.swap(s2)
     
    //  std::cout.swap(s2); // ERRO: swap é um membro protegido
     
        std::cout << s1.str() << '\n';
    }
```

Saída: 
```
    hello
```