# std::basic_ostream&lt;CharT,Traits&gt;::basic_ostream

```cpp
explicit basic_ostream( std::basic_streambuf<CharT, Traits>* sb );  // (1)
protected:
basic_ostream( const basic_ostream& rhs ) = delete;  // (2) (desde C++11)
protected:
basic_ostream( basic_ostream&& rhs );  // (3) (desde C++11)
```

  
1) Constrói o objeto `basic_ostream`, atribuindo valores iniciais à classe base chamando [basic_ios::init(sb)](<#/doc/io/basic_ios/init>).

2) O construtor de cópia é protegido e foi deletado. Streams de saída não são copiáveis.

3) O construtor de movimento usa `basic_ios<CharT, Traits>::move(rhs)` para mover todos os membros de `basic_ios`, exceto o `rdbuf()`, de `rhs` para `*this`. Este construtor de movimento é protegido: ele é chamado pelos construtores de movimento de classes de stream de saída movíveis [std::basic_ofstream](<#/doc/io/basic_ofstream>) e [std::basic_ostringstream](<#/doc/io/basic_ostringstream>), que sabem como mover corretamente o streambuffer associado.

### Parâmetros

sb  |  \-  |  streambuffer a ser usado como sequência de saída   
---|---|---
rhs  |  \-  |  basic_ostream para inicializar   
  
### Notas

Como [basic_ios::init(sb)](<#/doc/io/basic_ios/init>) define `badbit` quando `sb` é um ponteiro nulo, e como [`basic_ostream::sentry`](<#/doc/io/basic_ostream/sentry>) não faz nada se o stream já estiver em um estado de falha, escrever para um stream construído a partir de um ponteiro nulo `sb` é uma operação nula (no-op). 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
    #include <utility>
     
    int main()
    {
        // ERROR: copy ctor is deleted
    //  std::ostream myout(std::cout);
     
        // OK: shares buffer with cout
        std::ostream myout(std::cout.rdbuf());
     
        // ERROR: move constructor is protected
    //  std::ostream s2(std::move(std::ostringstream() << 7.1));
     
        // OK: move ctor called through the derived class
        std::ostringstream s2(std::ostringstream() << 7.1);
        myout << s2.str() << '\n';
     
        std::ostream dev_null{nullptr}; // see Notes above
        dev_null << "no-op";
    }
```

Saída: 
```
    7.1
```