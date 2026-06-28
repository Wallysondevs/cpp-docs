# std::basic_filebuf&lt;CharT,Traits&gt;::underflow

protected:  
virtual int_type underflow()

  
Lê mais dados para a área de entrada.

Comporta-se como a classe base std::basic_streambuf::underflow, exceto que para ler os dados da sequência de caracteres associada (o arquivo) para a área de leitura, primeiro lê os bytes do arquivo para um buffer temporário (alocado com o tamanho necessário), então usa std::codecvt::in do locale imbuído para converter a representação externa (tipicamente, multibyte) para a forma interna que é então usada para preencher a área de leitura. A conversão pode ser ignorada se std::codecvt::always_noconv do locale retornar true.

### Parâmetros

(nenhum)

### Valor de retorno

Traits::to_int_type(*gptr()) (o primeiro caractere da sequência pendente) em caso de sucesso, ou Traits::eof() em caso de falha.

### Exemplo

Execute este código
```
    #include <fstream>
    #include <iostream>
     
    struct mybuf : std::filebuf
    {
        int underflow()
        {
             std::cout << "Before underflow(): size of the get area is "
                       << egptr()-eback() << " with "
                       << egptr()-gptr() << " read positions available\n";
             int rc = std::filebuf::underflow();
             std::cout << "underflow() returns " << rc << ".\nAfter the call, "
                       << "size of the get area is "
                       << egptr()-eback() << " with "
                       << egptr()-gptr() << " read positions available\n";
            return rc;
        }
    };
     
    int main()
    {
        mybuf buf;
        buf.open("test.txt", std::ios_base::in);
        std::istream stream(&buf);
        while (stream.get()) ;
    }
```

Saída possível: 
```
    Before underflow(): size of the get area is 0 with 0 read positions available
    underflow() returns 73.
    After the call, size of the get area is 110 with 110 read positions available
    Before underflow(): size of the get area is 110 with 0 read positions available
    underflow() returns -1.
    After the call, size of the get area is 0 with 0 read positions available
```

### Veja também

[ underflow](<#/doc/io/basic_streambuf/underflow>)[virtual] |  lê caracteres da sequência de entrada associada para a área de leitura   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ underflow](<#/doc/io/basic_stringbuf/underflow>)[virtual] |  retorna o próximo caractere disponível na sequência de entrada   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ underflow](<#/doc/io/strstreambuf/underflow>)[virtual] |  lê um caractere da sequência de entrada sem avançar o ponteiro de próximo   
(função membro virtual protegida de `std::strstreambuf`)  
[ uflow](<#/doc/io/basic_filebuf/uflow>)[virtual] |  lê do arquivo associado e avança o ponteiro de próximo na área de leitura   
(função membro virtual protegida)  
[ overflow](<#/doc/io/basic_filebuf/overflow>)[virtual] |  escreve caracteres para o arquivo associado a partir da área de escrita   
(função membro virtual protegida)  
[ sgetc](<#/doc/io/basic_streambuf/sgetc>) |  lê um caractere da sequência de entrada sem avançar a sequência   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)