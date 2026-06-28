# std::basic_streambuf&lt;CharT,Traits&gt;::underflow

protected:  
virtual int_type underflow();

  
Garante que pelo menos um caractere esteja disponível na área de entrada, atualizando os ponteiros para a área de entrada (se necessário) e lendo mais dados da sequência de entrada (se aplicável). Retorna o valor desse caractere (convertido para `int_type` com Traits::to_int_type(c)) em caso de sucesso ou Traits::eof() em caso de falha.

A função pode atualizar os ponteiros `gptr`, `egptr` e `eback` para definir a localização dos dados recém-carregados (se houver). Em caso de falha, a função garante que gptr() == nullptr ou gptr() == egptr.

A versão da classe base da função não faz nada. As classes derivadas podem sobrescrever esta função para permitir atualizações na área de leitura (get area) em caso de esgotamento.

### Parameters

(none)

### Return value

O valor do caractere apontado pelo _ponteiro de leitura_ (get pointer) após a chamada em caso de sucesso, ou Traits::eof() caso contrário.

A versão da classe base da função retorna traits::eof().

### Note

As funções públicas de [std::streambuf](<#/doc/io/basic_streambuf>) chamam esta função apenas se gptr() == nullptr ou gptr() >= egptr().

### Example

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    class null_filter_buf : public std::streambuf
    {
        std::streambuf* src;
        char ch; // single-byte buffer
    protected:
        int underflow()
        {
            traits_type::int_type i;
            while ((i = src->sbumpc()) == '\0')
                ; // skip zeroes
            if (!traits_type::eq_int_type(i, traits_type::eof()))
            {
                ch = traits_type::to_char_type(i);
                setg(&ch, &ch, &ch+1); // make one read position available
            }
            return i;
        }
    public:
        null_filter_buf(std::streambuf* buf) : src(buf)
        {
            setg(&ch, &ch + 1, &ch + 1); // buffer is initially full
        }
    };
     
    void filtered_read(std::istream& in)
    {
        std::streambuf* orig = in.rdbuf();
        null_filter_buf buf(orig);
        in.rdbuf(&buf);
        for (char c; in.get(c);)
            std::cout << c;
        in.rdbuf(orig);
    }
     
    int main()
    {
        char a[] = "This i\0s \0an e\0\0\0xample";
        std::istringstream in(std::string(std::begin(a), std::end(a)));
        filtered_read(in);
    }
```

Saída:
```
    This is an example
```

### Veja também

[ uflow](<#/doc/io/basic_streambuf/uflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura (get area) e avança o próximo ponteiro   
(função membro virtual protegida)  
[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] | escreve caracteres para a sequência de saída associada a partir da área de escrita (put area)   
(função membro virtual protegida)  
[ underflow](<#/doc/io/basic_filebuf/underflow>)[virtual] | lê do arquivo associado   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)  
[ underflow](<#/doc/io/basic_stringbuf/underflow>)[virtual] | retorna o próximo caractere disponível na sequência de entrada   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ underflow](<#/doc/io/strstreambuf/underflow>)[virtual] | lê um caractere da sequência de entrada sem avançar o próximo ponteiro   
(função membro virtual protegida de `std::strstreambuf`)