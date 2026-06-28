# std::basic_ostream&lt;CharT,Traits&gt;::operator=

```cpp
protected:
basic_ostream& operator=( const basic_ostream& rhs ) = delete;  // (1)
protected:
basic_ostream& operator=( basic_ostream&& rhs );  // (2) (desde C++11)
```

  
1) O operador de atribuição por cópia é protegido e é deletado. Streams de saída não são [CopyAssignable](<#/doc/named_req/CopyAssignable>).

2) O operador de atribuição por movimento troca todos os membros de dados da classe base, exceto por [`rdbuf()`](<#/doc/io/basic_ios/rdbuf>), com rhs, como se chamasse swap(*rhs). Este operador de atribuição por movimento é protegido: ele é chamado apenas pelos operadores de atribuição por movimento das classes de stream de saída móveis derivadas [std::basic_ofstream](<#/doc/io/basic_ofstream>) e [std::basic_ostringstream](<#/doc/io/basic_ostringstream>), que sabem como atribuir por movimento corretamente os streambuffers associados.

### Parâmetros

rhs  |  \-  |  o objeto `basic_ostream` do qual atribuir a *this  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
    #include <utility>
     
    int main()
    {
        std::ostringstream s;
    //  std::cout = s;            // ERRO: operador de atribuição por cópia é deletado
    //  std::cout = std::move(s); // ERRO: operador de atribuição por movimento é protegido
        s = std::move(std::ostringstream() << 42); // OK, movido através da classe derivada
        std::cout << s.str() << '\n';
    }
```

Saída: 
```
    42
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 2067](<https://cplusplus.github.io/LWG/issue2067>) | C++11  | 1. o tipo de parâmetro da sobrecarga (1) era `basic_ostream&`  
2. o tipo de parâmetro da sobrecarga (2) era const basic_ostream&& | 1. adicionado const  
2. removido const