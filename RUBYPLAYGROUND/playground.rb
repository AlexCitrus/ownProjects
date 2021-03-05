# puts "Enter a number"

# first_num = gets.to_i

# puts "Enter another number"

# second_num = gets.to_i

# puts "#{first_num} + #{second_num} = #{first_num + second_num}"


def perfect_square?(n)
    i = 1
    if n == 0
      n = 1
    end
    while i * i < n
      i += 1
    end
    puts i * i == n
  end
  
  perfect_square?(0)