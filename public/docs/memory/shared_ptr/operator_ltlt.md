# std::shared_ptr&lt;T&gt;::operator&lt;&lt;

template< class T, class U, class V >  
[std::basic_ostream](<#/doc/io/basic_ostream>)<U, V>& operator<<( [std::basic_ostream](<#/doc/io/basic_ostream>)<U, V>& os, const [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;& ptr );

  
Insere o valor do ponteiro armazenado em ptr no fluxo de saída os.

Equivalente a os << ptr.get().

### Parâmetros

os  |  \-  |  um [std::basic_ostream](<#/doc/io/basic_ostream>) para inserir `ptr` em   
---|---|---
ptr  |  \-  |  os dados a serem inseridos em `os`  
  
### Valor de retorno

os

### Exemplo

Execute este código
```
    #include <iostream>
    #include <memory>
     
    class Foo {};
     
    int main()
    {
        auto sp = std::make_shared<Foo>();
        std::cout << sp << '\n';
        std::cout << sp.get() << '\n';
    }
```

Saída possível: 
```
    0x6d9028
    0x6d9028
```

### Veja também

[ get](<#/doc/memory/shared_ptr/get>) |  retorna o ponteiro armazenado   
(função membro pública)  