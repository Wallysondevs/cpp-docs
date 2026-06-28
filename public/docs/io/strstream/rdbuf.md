# std::strstream::rdbuf

strstreambuf* rdbuf() const; |  |  (obsoleto desde C++98)   
(removido em C++26)  

  
Retorna um ponteiro para o [std::strstreambuf](<#/doc/io/strstreambuf>) associado, removendo sua constness (apesar do qualificador const na função membro). 

### Parâmetros

(nenhum) 

### Valor de retorno

Ponteiro para o [std::strstreambuf](<#/doc/io/strstreambuf>) associado, com a constness removida. 

### Exemplo

Execute este código
```
    #include <strstream>
     
    int main()
    {
        const std::strstream buf;
        std::strstreambuf* ptr = buf.rdbuf();
    }
```