# std::basic_streambuf&lt;CharT,Traits&gt;::overflow

protected:  
virtual int_type overflow( int_type ch = Traits::eof() );

  
Garante que há espaço na [área de escrita](<#/doc/io/basic_streambuf>) para pelo menos um caractere, salvando alguma subsequência inicial de caracteres começando em [pbase()](<#/doc/io/basic_streambuf/pptr>) para a sequência de saída e atualizando os ponteiros para a área de escrita (se necessário). Se ch não for Traits::eof() (ou seja, Traits::eq_int_type(ch, Traits::eof()) != true), ele é colocado na área de escrita ou salvo diretamente na sequência de saída. 

A função pode atualizar os ponteiros `pptr`, `epptr` e `pbase` para definir o local onde escrever mais dados. Em caso de falha, a função garante que pptr() == nullptr ou pptr() == epptr. 

A versão da classe base da função não faz nada. As classes derivadas podem sobrescrever esta função para permitir atualizações na área de escrita em caso de esgotamento. 

### Parameters

ch  |  \-  |  o caractere a ser armazenado na área de escrita   
  
### Return value

Retorna um valor não especificado diferente de Traits::eof() em caso de sucesso, Traits::eof() em caso de falha. 

A versão da classe base da função retorna Traits::eof(). 

### Note

As funções [sputc()](<#/doc/io/basic_streambuf/sputc>) e [sputn()](<#/doc/io/basic_streambuf/sputn>) chamam esta função em caso de um overflow (pptr() == nullptr ou pptr() >= epptr()). 

### Example

Execute este código
```
    #include <array>
    #include <cstddef>
    #include <iostream>
     
    // Buffer for std::ostream implemented by std::array
    template<std::size_t size, class CharT = char>
    struct ArrayedStreamBuffer : std::basic_streambuf<CharT>
    {
        using Base = std::basic_streambuf<CharT>;
        using char_type = typename Base::char_type;
        using int_type = typename Base::int_type;
     
        ArrayedStreamBuffer()
        {
            // put area pointers to work with 'buffer'
            Base::setp(buffer.data(), buffer.data() + size);
        }
     
        int_type overflow(int_type ch) 
        {
            std::cout << "overflow\n";
            return Base::overflow(ch);
        }
     
        void print_buffer()
        {
            for (char_type i : buffer)
            {
                if (i == 0)
                    std::cout << "\\0";
                else
                    std::cout << i;
                std::cout << ' ';
            }
            std::cout << '\n';
        }
     
    private:
        std::array<char_type, size> buffer{}; // value-initialize buffer
    };
     
    int main()
    {
        ArrayedStreamBuffer<10> streambuf;
        std::ostream stream(&streambuf);
     
        stream << "hello";
        streambuf.print_buffer();
        if (stream.good())
            std::cout << "stream is good\n";
     
        stream << "world";
        streambuf.print_buffer();
        if (stream.good())
            std::cout << "stream is good\n";
     
        stream << "!";
        streambuf.print_buffer();
        if (!stream.good())
            std::cout << "stream is not good\n";
    }
```

Saída: 
```
    h e l l o \0 \0 \0 \0 \0
    stream is good
    h e l l o w o r l d 
    stream is good
    overflow
    h e l l o w o r l d 
    stream is not good
```

### See also

[ uflow](<#/doc/io/basic_streambuf/uflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura e avança o próximo ponteiro   
(função membro virtual protegida)  
[ underflow](<#/doc/io/basic_streambuf/underflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura   
(função membro virtual protegida)  
[ overflow](<#/doc/io/basic_filebuf/overflow>)[virtual] | escreve caracteres no arquivo associado a partir da área de escrita   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)  
[ overflow](<#/doc/io/basic_stringbuf/overflow>)[virtual] | anexa um caractere à sequência de saída   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ overflow](<#/doc/io/strstreambuf/overflow>)[virtual] | anexa um caractere à sequência de saída, pode realocar ou alocar inicialmente o buffer se dinâmico e não congelado   
(função membro virtual protegida de `std::strstreambuf`)