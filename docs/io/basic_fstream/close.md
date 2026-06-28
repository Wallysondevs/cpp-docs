# std::basic_fstream&lt;CharT,Traits&gt;::close

void close();

  
Fecha o arquivo associado.

Efetivamente chama [`rdbuf()->close()`](<#/doc/io/basic_filebuf/close>). Se ocorrer um erro durante a operação, setstate(failbit) é chamado.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Notas

Esta função é chamada pelo destrutor de `basic_fstream` quando o objeto stream sai do escopo e geralmente não é invocada diretamente.

### Exemplo

Execute este código
```
    #include <fstream>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::fstream f1("example1", std::ios::out),
                     f2("example2", std::ios::out),
                     f3("example3", std::ios::out);
     
        std::cout << std::boolalpha
                  << f1.is_open() << '\n'
                  << f2.is_open() << '\n'
                  << f3.is_open() << '\n';
     
        f1.close();
        f2.close();
     
        std::cout << f1.is_open() << '\n'
                  << f2.is_open() << '\n'
                  << f3.is_open() << '\n';
    }
```

Saída possível:
```
    true
    true
    true
    false
    false
    true
```

### Veja também

[ is_open](<#/doc/io/basic_fstream/is_open>) | verifica se o stream tem um arquivo associado   
(função membro pública)  
[ open](<#/doc/io/basic_fstream/open>) | abre um arquivo e o associa ao stream   
(função membro pública)  
[ close](<#/doc/io/basic_filebuf/close>) | descarrega o buffer da área de escrita e fecha o arquivo associado   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)