# std::basic_streambuf&lt;CharT,Traits&gt;::in_avail

[std::streamsize](<#/doc/io/streamsize>) in_avail();

  
Retorna o número de caracteres disponíveis na get area. Se uma posição de leitura estiver disponível, efetivamente retorna egptr() - gptr(), o tamanho da get area. Nesse caso, o número de bytes retornado é o número de bytes que podem ser extraídos do buffer sem chamar [underflow()](<#/doc/io/basic_streambuf/underflow>). 

Se a get area estiver vazia, chama [showmanyc()](<#/doc/io/basic_streambuf/showmanyc>) para determinar o número de bytes disponíveis na sequência de caracteres associada. Nesse caso, o valor retornado é o número de bytes que podem ser extraídos do buffer enquanto é garantido que [underflow()](<#/doc/io/basic_streambuf/underflow>) não retornaria `Traits::eof`. 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de caracteres disponíveis para leitura não bloqueante (seja o tamanho da get area ou o número de caracteres prontos para leitura da sequência de caracteres associada), ou -1 se nenhum caractere estiver disponível na sequência associada, conforme [showmanyc()](<#/doc/io/basic_streambuf/showmanyc>) puder informar. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ showmanyc](<#/doc/io/basic_filebuf/showmanyc>)[virtual] | opcionalmente fornece o número de caracteres disponíveis para entrada do arquivo   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)  
[ readsome](<#/doc/io/basic_istream/readsome>) | extrai blocos de caracteres já disponíveis   
(função membro pública de `std::basic_istream<CharT,Traits>`)